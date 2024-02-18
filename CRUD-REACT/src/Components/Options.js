import React, { useState, useEffect } from 'react';
import Product from './Product';
import Add from './Add';
import Delete from './Delete';
import Update from './Update';

function Options() {
  const [users, setUsers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/alldata');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const userData = await response.json();
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users');
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const response = await fetch('http://localhost:9000/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user: ' + error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:9000/api/delete/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user: ' + error.message);
    }
  };

  const handleUpdateUser = async (userId, updatedUserData) => {
    try {
      const response = await fetch(`http://localhost:9000/api/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user: ' + error.message);
    }
  };

  const handleLogout = () => {
    // Reload the page to perform logout
    window.location.reload();
  };

  return (
    <div>
      <div className='bg-red-500'>
        <div className='bg-white text-center text-4xl font-bold p-5 '>
          <p>Student Management</p>
        </div>
        <p className='font-semibold  text-white text-center p-5 text-3xl '>CRUD OPERATIONS</p>
      </div>
      <div className='flex justify-center'>
        <button onClick={() => setShowAdd(true)} className='text-xl rounded-lg bg-green-400 m-4   p-3'>Add</button>
        <button onClick={() => setShowDelete(true)} className='text-xl rounded-lg bg-green-400  m-4 p-3'>Delete</button>
        <button onClick={() => setShowUpdate(true)} className='text-xl rounded-lg bg-green-400  m-4 p-3'>Update</button>
        <button onClick={handleLogout} className="text-xl rounded-lg bg-red-500 m-4 p-3 text-white">Logout</button>
      </div>
      <div className="flex flex-col items-center">
        <h2 className='bg-yellow-300 w-full text-center p-2 font-semibold text-xl'>Data List:</h2>
        <div className="flex flex-wrap justify-center">
            {users.map(user => (
                <Product key={user.id} name={user.name} course={user.course} gender={user.gender} />
            ))}
        </div>
      </div>
      {showAdd && <Add onClose={() => setShowAdd(false)} onAddUser={handleAddUser} />}
      {showDelete && <Delete onClose={() => setShowDelete(false)} onDeleteUser={handleDeleteUser} />}
      {showUpdate && <Update onClose={() => setShowUpdate(false)} onUpdateUser={handleUpdateUser} />}
    </div>
  );
}

export default Options;
