import React from 'react';
import './App.css';
import UserList from './UserList';

function App() {
  console.log(UserList); // Add this line
  return (
    <div className="App">
      <UserList />
    </div>
  );
}

export default App;
