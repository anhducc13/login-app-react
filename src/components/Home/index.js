import React, { useEffect, useState } from 'react';
import { authServices } from 'services';


export default () => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    authServices.currentUser()
      .then(res => {
        setUser(res.data.username);
      })
  }, [])

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
      {user}
    </div>
  )
}
