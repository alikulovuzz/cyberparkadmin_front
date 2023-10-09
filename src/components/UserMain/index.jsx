import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import UserWrapper from '../UserWrapper'

export default function UserMain() {
  const { user } = useContext(UserContext)
  
  return (
    <div>
      {/* {user?.organization_name} */}
      <UserWrapper/>
    </div>
  )
}
