"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed');
            login(data.token, data.user);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center pt-16 px-4">
                <div className="max-w-md w-full bg-surface p-8 rounded-xl border border-white/10 shadow-2xl">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome Back</h2>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-primary hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
