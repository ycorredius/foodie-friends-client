import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL, defaultImage } from "../../constants";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
//BUG: Whenever a user logs out and logs back in clicks on show recipe. current user state shows as undefines.
// it then works when you refersh.

//TODO: Refactor to edit to po`int to a route instead of triggering a boolean.
export default function RecipeDetail() {
  const [recipe, setRecipe] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${API_URL}/recipes/${id}`);
      console.log(result.data.data);
      setRecipe(result.data.data);
    };
    fetchData();
  }, [id]);

  if (recipe.length === 0) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <div className="px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex justify-center items-center gap-1"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          back
        </button>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="aspect-[3/1] ">
          {recipe.attributes.avatar ? (
            <img
              src={recipe.attributes.avatar}
              alt={recipe.attributes.name}
              className="rounded-lg shadow-md"
            />
          ) : (
            <img src={defaultImage} alt={recipe.attributes.name} />
          )}
        </div>
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center py-4">
            {recipe.attributes.name}
          </h1>
          <div className="justify-start items-start">
            <div className="flex flex-col items-start col-span-2 py-2">
              <h5 className="text-xl py-2 font-semibold">Categories</h5>
              <ul className="grid grid-cols-2">
                {recipe.attributes.categories.map((category) => {
                  return (
                    <li className="text-sm" key={category.id}>
                      {category.tag}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-span-2 col-start-4 py-2">
              <h5 className="font-semibold text-xl py-2">Ingredients</h5>
              <p className="text-sm">{recipe.attributes.ingredients}</p>
            </div>
            <div className="col-start-2 col-span-3 py-2">
              <h5 className="font-semibold text-xl py-2">Instructions</h5>
              <p className="text-sm">{recipe.attributes.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
