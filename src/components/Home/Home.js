import React, { useContext } from 'react';
import { UserContext } from 'UserContext';

export default function Home() {

  const [user] = useContext(UserContext);

  return (
    <div
      style={{
        fontSize: 50,
        color: "#4285F4",
        textAlign: "center",
        margin: "auto"
      }}
    >
      Welcome
      {' '}
      {user && user.username}
    </div>
  )
}
