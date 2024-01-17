'use client'

import { useSession } from "next-auth/react"
import { useState } from "react"



export default function Dashboard() {
  const [newName, setNewName] = useState("")
  const { data : session, status, update } = useSession()

  
  return (
    <div className='p-20 pt-48'>
      <h1 className="text-2xl">Dashboard Page (protected)</h1>
      <p>Hi {session?.user?.name}</p>
      {/* <label>UpdateName</label>
      <input className='text-gray-900' type="text" placeholder="enter a new name" value={newName} onChange={(e) => setNewName(e.target.value)}/> */}
      {/* <button className='block px-6 py-2 bg-blue-500 rounded-lg ' onClick={() => update({name: newName})}>Update</button> */}
    </div>
  )
}
