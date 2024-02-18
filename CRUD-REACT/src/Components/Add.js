import React, { useState } from 'react';

function Add({ onClose, onAddUser }) {
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [gender, setGender] = useState('');
    const [rollNo, setRollNo] = useState('');

    const handleSubmit = () => {
        if (!name || !course || !gender || !rollNo) {
            alert('Please enter all fields');
            return;
        }

        onAddUser({ name, course, gender, rollNo });
        onClose();
    };

    return (
        <div className="fixed top-0 h-screen w-screen left-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg max-w-xl p-8">
                <h1 className="text-2xl font-semibold text-center text-red-700 mb-6">Add Account</h1>
                <div className="flex flex-col space-y-4">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded-lg border-black" />
                    <label>Course:</label>
                    <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} className="border p-2 rounded-lg border-black" />
                    <label>Gender:</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="border p-2 rounded-lg border-black">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <label>Roll No:</label>
                    <input type="text" value={rollNo} onChange={(e) => setRollNo(e.target.value)} className="border p-2 rounded-lg border-black" />
                </div>
                <div className="flex justify-center mt-6">
                    <button onClick={handleSubmit} className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-full py-2 px-6 mr-4">Add</button>
                    <button onClick={onClose} className="text-white bg-red-400 hover:bg-red-500 font-medium rounded-full py-2 px-6">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default Add;
