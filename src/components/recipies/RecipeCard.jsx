import { Link } from "react-router-dom";
import { defaultImage } from "../../constants";

const RecipeCard = ({ recipe }) => {
  const { id, name, avatar, user } = recipe.attributes;

  return (
    <li className="relative bg-[#FFFFF0] lg:p-4 drop-shadow-lg rounded-md">
      <Link to={`/recipes/${id}`}>
        <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
          <img
            src={avatar == null ? defaultImage : avatar}
            alt={name}
            className="pointer-events-none object-cover group-hover:opacity-75"
          />
          <span className="sr-only">{name}</span>
          <span className="sr-only"></span>
        </div>
        <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
          {name}
        </p>
        <p className="pointer-events-none block text-sm font-medium text-gray-500">
          {" "}
          by: {user.first_name} {user.last_name}
        </p>
      </Link>
    </li>
  );
};

export default RecipeCard;
