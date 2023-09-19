import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../../constants";

function RecipeForm() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/");
    }})

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await axios.post(`${API_URL}/recipes`, data)
          .then((res) => {
            console.log(res);
          })
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input name="name" {...register("name")} />
        </div>
        <div>
          <label htmlFor="instructions"> Instructions</label>
          <input name="instructions" {...register("instructions")} />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients</label>
          <textarea name="ingredients" {...register("ingredients")} />
        </div>
        <div>
          <label htmlFor="avatar">Image</label>
          <input name="avatar" {...register("avatar")} />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default RecipeForm;
