import { useState } from "react";
import RecipeCard from "./RecipeCard.jsx";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../../constants.jsx";
import "../../styles/Recipes.css";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${API_URL}/recipes`);
        setRecipes(result.data.data);
      } catch (err) {
        console.log("Some error occurred", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 lg:p-8 sm:p-4 p-2"
      >
        {recipes.map((recipe) => {
          return <RecipeCard recipe={recipe} key={recipe.id} />;
        })}
      </ul>
    </div>
  );
}
