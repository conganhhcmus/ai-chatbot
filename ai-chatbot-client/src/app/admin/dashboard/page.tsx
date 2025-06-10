"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import InitialActionsManager from '@/app/components/InitialActionsManager';

const AdminDashboard = () => {
    const router = useRouter();
    const [message, setMessage] = useState('Loading...');

    useEffect(() => {
        const token = localStorage.getItem('admin-token');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        const fetchHealth = async () => {
            try {
                const response = await fetch('/api/admin/health', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.text();
                    setMessage(data);
                } else if (response.status === 401) {
                    router.push('/admin/login');
                } else {
                    setMessage('Failed to fetch health status.');
                }
            } catch (err) {
                setMessage('An error occurred.');
            }
        };

        fetchHealth();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('admin-token');
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <button onClick={handleLogout} className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Logout
                    </button>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-4">Welcome, Admin!</h2>
                            <p>Backend Health Check: <span className="font-mono bg-gray-200 p-1 rounded">{message}</span></p>
                            
                            <InitialActionsManager />
                            
                            {/* TODO: Add widgets for managing knowledge, and chats */}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard; 