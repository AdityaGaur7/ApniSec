"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import IssueForm from '@/components/IssueForm';
import IssueList from '@/components/IssueList';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <p className="text-gray-400">Welcome back, {user.name}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <IssueForm onIssueCreated={() => setRefreshTrigger(prev => prev + 1)} />
                    </div>
                    <div className="lg:col-span-2">
                        <IssueList refreshTrigger={refreshTrigger} />
                    </div>
                </div>
            </main>
        </div>
    );
}
