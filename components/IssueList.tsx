"use client";

import { useState, useEffect } from 'react';

interface Issue {
    _id: string;
    type: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdAt: string;
}

interface IssueListProps {
    refreshTrigger: number;
}

export default function IssueList({ refreshTrigger }: IssueListProps) {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchIssues();
    }, [refreshTrigger, filter]);

    const fetchIssues = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            let url = '/api/issues';
            if (filter !== 'All') {
                url += `?type=${encodeURIComponent(filter)}`;
            }

            const res = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setIssues(data);
            }
        } catch (error) {
            console.error('Failed to fetch issues', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this issue?')) return;
        try {
            const token = localStorage.getItem('token');
            await fetch(`/api/issues/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchIssues();
        } catch (error) {
            console.error('Failed to delete issue', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Your Issues</h3>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-surface border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                >
                    <option value="All">All Types</option>
                    <option value="Cloud Security">Cloud Security</option>
                    <option value="Reteam Assessment">Reteam Assessment</option>
                    <option value="VAPT">VAPT</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-8 text-gray-400">Loading issues...</div>
            ) : issues.length === 0 ? (
                <div className="text-center py-8 text-gray-400 bg-surface/50 rounded-xl border border-white/5">
                    No issues found. Create one above!
                </div>
            ) : (
                <div className="grid gap-4">
                    {issues.map((issue) => (
                        <div key={issue._id} className="bg-surface p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${issue.priority === 'Critical' ? 'bg-red-500/20 text-red-400' :
                                            issue.priority === 'High' ? 'bg-orange-500/20 text-orange-400' :
                                                issue.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-green-500/20 text-green-400'
                                        }`}>
                                        {issue.priority}
                                    </span>
                                    <span className="ml-2 inline-block px-2 py-1 rounded text-xs font-bold bg-blue-500/20 text-blue-400">
                                        {issue.type}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleDelete(issue._id)}
                                    className="text-gray-400 hover:text-red-400 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2">{issue.title}</h4>
                            <p className="text-gray-400 text-sm mb-4">{issue.description}</p>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <span>Status: {issue.status}</span>
                                <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
