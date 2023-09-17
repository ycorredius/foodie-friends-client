import { useEffect,  useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { defaultImage } from "../../constants";
//BUG: Whenever a user logs out and logs back in clicks on show recipe. current user state shows as undefines.
// it then works when you refersh.

//TODO: Refactor to edit to po`int to a route instead of triggering a boolean.
export default function RecipeDetail () {
  const [recipe,setRecipe] = useState([])
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3001/api/v1/recipes/${id}`);
      console.log(result.data.data);
      setRecipe(result.data.data);
    };
    fetchData();
  },[id]); 
  
  if (recipe.length === 0) {
    return <h1>Loading...</h1>;
  } 
  return (
    <div>
      <div>
        <h1 className="text-4xl">{recipe.attributes.name}</h1>
        <div className="w-2/3 aspect-[3/1] ">
          {recipe.attributes.avatar ? <img src={recipe.attributes.avatar} alt={recipe.attributes.name} />: <img src={defaultImage} alt={recipe.attributes.name} />}
        </div>
      </div>
      <div>
        <h5 >Categories</h5>
          <ul>
            {recipe.attributes.categories.map((category) => {
              return <li className="text-lg" key={category.id}>{category.tag}</li>;
            })}
          </ul>
        <h5 className="text-xl">Ingredients</h5>
        <div>
          {recipe.attributes.ingredients}
        </div>
        <h5 className="text-xl">Instructions</h5>
        <div>
          {recipe.attributes.instructions}
        </div>
      </div>
    </div>
  )
}
