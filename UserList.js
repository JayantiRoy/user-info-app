import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data); // Initialize filteredUsers with the full user list
      })
      .catch(error => console.error('Error fetching user data:', error));

    const savedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(savedSearchHistory);
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);

      if (!searchHistory.includes(value)) {
        const newSearchHistory = [...searchHistory, value];
        setSearchHistory(newSearchHistory);
        localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory));
      }
    } else {
      setFilteredUsers(users); // Reset to full user list if search term is empty
    }
  };

  const handleSort = () => {
    const sorted = [...filteredUsers].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredUsers(sorted);
  };

  return (
    <div>
      <h1>User List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={handleSort}>Sort by Name</button>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
          </li>
        ))}
      </ul>
      <h2>Past Searches</h2>
      <ul>
        {searchHistory.map((term, index) => (
          <li key={index}>{term}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
