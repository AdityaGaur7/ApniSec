"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-primary tracking-tighter">
                            ApniSec
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/#features" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Services
                            </Link>
                            <Link href="/#about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                About
                            </Link>
                            {user ? (
                                <>
                                    <Link href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="bg-red-500/10 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-md text-sm font-medium transition-colors border border-red-500/20"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Login
                                    </Link>
                                    <Link href="/register" className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-md text-sm font-medium transition-colors border border-primary/20">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
