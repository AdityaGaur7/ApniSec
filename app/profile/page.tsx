"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        } else if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user, loading, router]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name }),
            });
            if (res.ok) {
                setMessage('Profile updated successfully');
            } else {
                setMessage('Failed to update profile');
            }
        } catch (error) {
            setMessage('Error updating profile');
        }
    };

    if (loading || !user) {
        return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
                <div className="bg-surface p-8 rounded-xl border border-white/10">
                    <h1 className="text-3xl font-bold text-white mb-6">Profile Settings</h1>
                    {message && (
                        <div className={`p-3 rounded-lg mb-4 text-sm ${message.includes('success') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                disabled
                                className="w-full bg-background/50 border border-white/5 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                        </div>
                        <button
                            type="submit"
                            className="bg-primary text-white font-bold px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
