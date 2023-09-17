import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

export default function Login () {
  const {register, handleSubmit, formState:{errors}} = useForm()
  const navigate = useNavigate()

  //TODO: Create a password recovery or reset system.

  const onSubmit = (data) => {
   const {email, password} = data
    axios.post('http://localhost:3001/api/v1/auths',{email: email, password: password} )
    .then((res) => {
      if (res.status === 200 && res.statusText === "OK") {
        localStorage.setItem('accessToken', res.data.token)
        navigate('/')
      }else {
        console.log(res.data.errors)
      }
      return null;
    })
    .catch((err) => {
      console.log(err)
    })
  };

    useEffect(() => {
      if (localStorage.getItem('accessToken')) {
        navigate('/')
      }
    })
    
    return (
      <div className='h-screen flex justify-center items-center bg-[#f9f9f9]'>
        <div className='bg-[#EF6262] p-8 rounded-md shadow-xl lg:w-1/3 '>
          {errors.email && <span>email required</span>}
          {errors.password && <span>Password required</span>}
          <h1 className='text-white text-2xl text-center pb-8'>Login Here!</h1>
          <div className='bg-[#EF6262]'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex justify-between'>
                <label className='text-white items-center py-1' >
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  {...register("email", {required: true})}
                  className='p-1 mx-4 border-2 border-[#468B97] lg:w-2/3'
                />
              </div>
              <br />
              <div className='flex justify-between'>
                <label className='text-white py-1' >
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  {...register("password", {required: true})}
                  className='p-1 mx-4 border-2 border-[#468B97] w-2/3'
                />
              </div>
              <br />
              <div className='flex justify-center'>
                <button
                  className='text-[#468B97] bg-[#F3AA60] py-2 px-3 rounded-md'
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}
