import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";

const Profile = () =>{
  const [user,setUser] = useState(null)
  useEffect(()=>{
  const token = localStorage.getItem('accessToken')
  axios.get(`${API_URL}/me`, { headers: {'Content-Type' :'application/json', 'Authorization': `Bearer ${token}`}})
  .then((res) => {
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