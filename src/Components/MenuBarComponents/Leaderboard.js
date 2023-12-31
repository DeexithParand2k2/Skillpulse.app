import React, { useEffect, useState } from 'react'
import Rankings from '../Leaderboard/Rankings'

// fetch the email here
function Leaderboard() {

  const [email,setEmail] = useState('yogi@gmail.com')

  useEffect(()=>{
    if(sessionStorage.getItem('myUseremail')){
      setEmail(JSON.parse(sessionStorage.getItem('myUseremail')).username)
    }
  },[])

  return (
    <Rankings UserEmail={email} />
  )
}

export default Leaderboard