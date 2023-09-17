import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () =>{
  const [user,setUser] = useState(null)
  useEffect(()=>{
  const token = localStorage.getItem('accessToken')
  axios.get('http://localhost:3001/api/v1/me', { headers: {'Content-Type' :'application/json', 'Authorization': `Bearer ${token}`}})
  .then((res) => {
    debugger
    setUser(res.data)
  })
},[])

if(!user){
  return <h1>Loading...</h1>
}
  return(
    <>
    <h1>{user.full_name}</h1>
    </>
  )
}

export default Profile;