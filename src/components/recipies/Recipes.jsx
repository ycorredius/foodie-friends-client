import { useState } from 'react';
import RecipeCard from './RecipeCard.jsx'
import axios from 'axios';
import { useEffect } from 'react';
import { API_URL } from '../../constants.jsx';
export default function Recipes () {
  const [recipes,setRecipes] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const result = await axios.get(`${API_URL}/recipes`)
        console.log(result.data.data)
        setRecipes(result.data.data)
      } catch(err){
        setErrors(err)
        console.log("Some error occurred", err)
      } finally {
        console.log("finally")
      }
   }
    fetchData()
  },[])
  return(
    <div>
      <h1>Recipes</h1>
      <div className='grid grid-cols-3'>
        {recipes.map((recipe) => {
          return <RecipeCard recipe={recipe} key={recipe.id}/>
        })}
      </div>
    </div>
  )
}
