import React, { useState, createContext, useEffect } from 'react';
import { authServices } from 'services';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const { children } = props
  const [user, setUser] = useState({});

  const fetchUser = async() => {
    try {
      const response = await authServices.currentUser()
      setUser(response.data)
    } catch (err) {
      //
    }
  }

  useEffect(() => {
    fetchUser();
    return () => setUser(null);
  }, [])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}
