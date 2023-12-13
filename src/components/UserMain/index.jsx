import React, { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import UserWrapper from '../UserWrapper'

export default function UserMain() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user?.role.includes("company")) {
      sessionStorage.clear();
      setUser("");
      window.location.reload(false);
    }
  }, [user]);
  return (
    <div>
      {/* {user?.organization_name} */}
      <UserWrapper/>
    </div>
  )
}
