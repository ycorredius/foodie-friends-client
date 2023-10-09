import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants";
import "../../styles/Recipes.css";
import ProfileDropdown from "../profile/ProfileDropdown";

export default function RecipeLayout() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function FetchUser() {
      try{
      await axios
        .get(`${API_URL}/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          console.log(`Error code: ${res.status}`)
          if (res.status === 200 && res.statusText === "OK") {
            setUser(res.data);
          }
        });
      } catch(error){
        if(error.response.status === 401){
          localStorage.removeItem("accessToken")
          setAccessToken(!accessToken)
        }
      }
    }
    if (localStorage.getItem("accessToken")) {
      setAccessToken(true);
      FetchUser();
    } else {
      setAccessToken(false);
    }
  }, [accessToken]);
  const logout = async () => {
    await axios
      .delete(`${API_URL}/auths`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
          localStorage.removeItem("accessToken");
          navigate("/recipes");
          setAccessToken(!accessToken);
        } else {
          console.log(res.data.errors);
        }
      });
  };

  return (
    <>
      <nav id="main-nav" className="flex justify-between m-4">
        <div></div>
        <div className="flex justify-around">
          <NavLink to="/" className="text-xl">
            Foodie Friends
          </NavLink>
        </div>
        <div>
          {accessToken ? (
            <div>
              <ProfileDropdown user={user} logout={logout} />
            </div>
          ) : (
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          )}
        </div>
      </nav>
      <div id="main-content">
        <Outlet />
      </div>
    </>
  );
}
