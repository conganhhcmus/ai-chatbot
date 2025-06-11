"use client";

import { useState, useEffect, FormEvent } from 'react';

// Define the type for an initial action button
interface InitialActionButton {
    id: number;
    label: string;
    payload: string;
}

// Define a type for the button data when creating/editing, omitting the id
type ButtonFormData = Omit<InitialActionButton, 'id'>;

const InitialActionsManager = () => {
    const [buttons, setButtons] = useState<InitialActionButton[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State for the form
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [formData, setFormData] = useState<ButtonFormData>({ label: '', payload: '' });

    const fetchButtons = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('admin-token');
            const response = await fetch('/api/admin/initial-actions', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch initial action buttons.');
            }
            const data = await response.json();
            setButtons(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (button: InitialActionButton) => {
        setIsEditing(button.id);
        setFormData({ label: button.label, payload: button.payload });
    };

    const handleCancel = () => {
        setIsEditing(null);
        setFormData({ label: '', payload: '' });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this button?')) return;

        try {
            const token = localStorage.getItem('admin-token');
            const response = await fetch(`/api/admin/initial-actions/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Failed to delete the button.');
            }

            // Refresh the list
            fetchButtons();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred during deletion.');
            }
        }
    };

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `/api/admin/initial-actions/${isEditing}` : '/api/admin/initial-actions';
        
        const body = JSON.stringify(isEditing ? { id: isEditing, ...formData } : formData);

        try {
            const token = localStorage.getItem('admin-token');
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body,
            });

            if (!response.ok) {
                throw new Error(`Failed to ${isEditing ? 'update' : 'create'} the button.`);
            }

            // Refresh list and reset form
            fetchButtons();
            handleCancel();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred while saving.');
            }
        }
    };

    useEffect(() => {
        fetchButtons();
    }, []);

    if (isLoading) return <p>Loading initial action buttons...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Manage Initial Action Buttons</h2>
            
            <div className="bg-white p-4 rounded-lg shadow mb-4">
                <h3 className="text-lg font-semibold mb-2">{isEditing ? 'Edit Button' : 'Add New Button'}</h3>
                <form onSubmit={handleSave}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Label (e.g., 'Check Status')"
                            value={formData.label}
                            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Payload (e.g., 'check_order_status')"
                            value={formData.payload}
                            onChange={(e) => setFormData({ ...formData, payload: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                        <div className="flex items-center">
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                                {isEditing ? 'Save Changes' : 'Add Button'}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={handleCancel} className="ml-2 text-gray-500 hover:text-gray-700">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Current Buttons</h3>
                <ul>
                    {buttons.map(button => (
                        <li key={button.id} className="border-b last:border-b-0 py-2 flex justify-between items-center">
                            <span><strong>{button.label}</strong>: <code>{button.payload}</code></span>
                            <div>
                                <button onClick={() => handleEdit(button)} className="text-sm bg-yellow-500 text-white py-1 px-2 rounded mr-2 hover:bg-yellow-600">Edit</button>
                                <button onClick={() => handleDelete(button.id)} className="text-sm bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InitialActionsManager; 