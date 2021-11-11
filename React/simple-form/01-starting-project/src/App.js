import React, { useState } from "react";
import AddUser from "./Users/AddUser";
import UserList from "./Users/UsersList";

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (newUser, newAge) => {
    setUsersList((prev) => {
      return [
        ...prev,
        { id: Math.random().toString(), name: newUser, age: newAge },
      ];
    });
  };

  return (
    <div>
      <AddUser addNewUser={addUserHandler} />
      <UserList users={usersList} />
    </div>
  );
}

export default App;
