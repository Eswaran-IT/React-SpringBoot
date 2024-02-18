import React, { useState } from 'react';

function Delete({ onClose, onDeleteUser }) {
    const [id, setId] = useState('');

    const handleSubmit = () => {
        if (!id) {
            alert('Please enter user ID');
            return;
        }

        onDeleteUser(id);
        onClose();
    };

    return (
        <div className="fixed top-0 h-screen w-screen left-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg max-w-xl p-8">
                <h1 className="text-2xl font-semibold text-center text-red-700 mb-6">Delete Account</h1>
                <div className="flex flex-col space-y-4">
                    <label>ID:</label>
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} className="border p-2 rounded-lg border-black" />
                </div>
                <div className="flex justify-center mt-6">
                    <button onClick={handleSubmit} className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-full py-2 px-6 mr-4">Delete</button>
                    <button onClick={onClose} className="text-white bg-red-400 hover:bg-red-500 font-medium rounded-full py-2 px-6">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default Delete;
