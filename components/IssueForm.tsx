"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface IssueFormProps {
    onIssueCreated: () => void;
}

export default function IssueForm({ onIssueCreated }: IssueFormProps) {
    const [type, setType] = useState('Cloud Security');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/issues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ type, title, description, priority }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create issue');
            }

            setTitle('');
            setDescription('');
            setPriority('Medium');
            onIssueCreated();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-surface p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Create New Issue</h3>
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Issue Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                        >
                            <option value="Cloud Security">Cloud Security</option>
                            <option value="Reteam Assessment">Reteam Assessment</option>
                            <option value="VAPT">VAPT</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors h-32"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-white font-bold px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create Issue'}
                </button>
            </form>
        </div>
    );
}
