import {Link} from 'react-router-dom'
import { defaultImage } from '../../constants'

const RecipeCard = ({recipe}) =>{
  const {id} = recipe.attributes
  const{name, avatar} = recipe.attributes

  return (
    <div>
      <div className="container w-full max-w-xs p-4 mb-4">
        <div className="flex flex-col justify-center items-center">
          <div className="bg-gray-500">
            <div className="flex flex-col place-items-center">
              <img src={avatar == null ? defaultImage : avatar} alt={name}  />
              <p className="text-xl"> Name: {name}</p>
              <Link to={`/recipes/${id}`}>
                <button
                  className="bg-blue-dark hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center"
                  data-target={id}
                >
                  Show Recipe
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;