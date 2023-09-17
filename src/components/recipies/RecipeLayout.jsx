import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RecipeLayout() {
  const navigate = useNavigate()
  const [accessToken, setAccessToken] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setAccessToken(true)
    }else {
      setAccessToken(false)
    }
  }, [])
  const logout = async () => {
    const token = localStorage.getItem('accessToken')
   await axios.delete('http://localhost:3001/api/v1/auths', { headers: {'Content-Type' :'application/json', 'Authorization': `Bearer ${token}`}})
          .then((res) => {
            if (res.status === 200 && res.statusText === "OK") {
              localStorage.removeItem('accessToken')
              navigate('/recipes')
              setAccessToken(!accessToken)
            }else {
              console.log(res.data.errors)
            }
          })
  }

  return(
    <>
    <nav id="main-nav" className="flex justify-between m-4">
      <div></div>
      <div className="flex justify-around">
        <NavLink to="/recipes" className="px-4 my-2">Recipes</NavLink>
        <NavLink to="/recipes/new" className="px-4 my-2" >New Recipe</NavLink>
      </div>
      <div>
        {
          accessToken ? 
            (<div> 
              <button onClick={logout} id="logout">Logout</button>
              <NavLink to="/profile">Profile</NavLink>
            </div>) : 
            (<NavLink to="/login">Login</NavLink>)
        }
      </div>
    </nav>
    <div id="main-content">
      <Outlet/>
    </div>
    </>
  )
}