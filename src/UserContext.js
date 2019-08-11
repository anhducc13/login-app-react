import React, { useState, createContext, useEffect } from 'react';
import { authServices } from 'services';

export const UserContext = createContext([]);

export const UserProvider = (props) => {
  const { children } = props
  const [user, setUser] = useState(null);

  const fetchUser = async() => {
    try {
      const data = await authServices.currentUser()
      setUser(data)
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
