"use client";

import { useState, useEffect, ChangeEvent } from 'react';

interface Document {
    id: number;
    fileName: string;
    uploadedAt: string;
}

const KnowledgeManager = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [editingDocId, setEditingDocId] = useState<number | null>(null);
    const [updateFile, setUpdateFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');

    const fetchDocuments = async () => {
        const token = localStorage.getItem('admin-token');
        const response = await fetch('/api/admin/knowledge', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            const data = await response.json();
            setDocuments(data);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpdateFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setUpdateFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem('admin-token');
        setMessage('Uploading...');
        const response = await fetch('/api/admin/knowledge', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData,
        });

        if (response.ok) {
            setMessage('File uploaded successfully!');
            setFile(null);
            const fileInput = document.getElementById('file-input') as HTMLInputElement;
            if(fileInput) fileInput.value = '';
            fetchDocuments();
        } else {
            setMessage('Upload failed.');
        }
    };

    const handleUpdate = async (id: number) => {
        if (!updateFile) {
            setMessage('Please select a file to update.');
            return;
        }

        const formData = new FormData();
        formData.append('file', updateFile);

        const token = localStorage.getItem('admin-token');
        setMessage('Updating...');
        const response = await fetch(`/api/admin/knowledge/${id}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData,
        });

        if (response.ok) {
            setMessage('Document updated successfully!');
            setUpdateFile(null);
            setEditingDocId(null);
            fetchDocuments();
        } else {
            setMessage('Update failed.');
        }
    };

    const handleDelete = async (id: number) => {
        const token = localStorage.getItem('admin-token');
        if (confirm('Are you sure you want to delete this document?')) {
            const response = await fetch(`/api/admin/knowledge/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.ok) {
                setMessage('Document deleted.');
                fetchDocuments();
            } else {
                setMessage('Failed to delete document.');
            }
        }
    };

    return (
        <div className="mt-8 p-4 border border-gray-300 rounded-lg bg-white">
            <h3 className="text-xl font-semibold mb-4">Knowledge Base Management</h3>
            {message && <p className="mb-4 p-2 bg-blue-100 text-blue-800 rounded">{message}</p>}
            <div className="mb-4">
                <input id="file-input" type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                <button onClick={handleUpload} className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Upload Document</button>
            </div>
            <div>
                <h4 className="font-semibold mb-2">Uploaded Documents:</h4>
                <ul className="list-disc pl-5 space-y-2">
                    {documents.map((doc: Document) => (
                        <li key={doc.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50">
                            <div>
                                <span>{doc.fileName} - <span className="text-sm text-gray-500">Uploaded at: {new Date(doc.uploadedAt).toLocaleString()}</span></span>
                                {editingDocId === doc.id && (
                                    <div className="mt-2">
                                        <input type="file" onChange={handleUpdateFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                                        <div className="mt-2">
                                            <button onClick={() => handleUpdate(doc.id)} className="py-1 px-3 bg-green-500 text-white rounded-lg hover:bg-green-600">Confirm Update</button>
                                            <button onClick={() => { setEditingDocId(null); setUpdateFile(null); }} className="ml-2 py-1 px-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancel</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center">
                                {editingDocId !== doc.id && (
                                    <button onClick={() => { setEditingDocId(doc.id); setMessage(''); }} className="py-1 px-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 mr-2">Edit</button>
                                )}
                                <button onClick={() => handleDelete(doc.id)} className="py-1 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default KnowledgeManager; 