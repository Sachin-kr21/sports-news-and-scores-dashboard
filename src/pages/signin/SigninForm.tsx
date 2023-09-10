/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
// Dialogue 1: First we will import the API_ENDPOINT constant from the `config` folder
import { API_ENDPOINT } from '../../config/constants';
import {useNavigate} from 'react-router-dom';

import { useForm, SubmitHandler } from "react-hook-form";

const SigninForm: React.FC = () => {

  type Inputs = {
    email : string,
    password : string
  };
  const navigate = useNavigate();
  const { register , handleSubmit } = useForm<Inputs>();

  // Dialogue 2: Then we will define the handle submit function
  const onSubmit : SubmitHandler<Inputs> = async (data) => {
    // event.preventDefault();
    const {email,password} = data;
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {email,password} ),
      });

      if (!response.ok) {
        throw new Error('Sign-in failed');
      }

      console.log('Sign-in successful');
      // navigate("/dashboard");
      // src/pages/signin/SigninForm.tsx
      const data = await response.json()
      // console.log(data);
      localStorage.setItem('authToken',data.auth_token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      localStorage.setItem('userPreferences' , JSON.stringify(data.user.preferences))
      try {
        // ...
        // ...
        
        // Redirect users to account path after login
        navigate("/dashboard")
        // window.location.reload()

    } catch (error) {
      console.error('Sign-in failed:', error);
    }
      // Dialogue: After successful signin we have to redirect the user to the secured page. We will do that later.


    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  // Dialogue: Then we will use the handleSubmit function with our form
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input type="email" 
        id="email"
        placeholder='Enter email...'
        autoFocus
        {...register('email', { required: true })}
        className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Password:</label>
        <input type="password" 
        id="password"
        placeholder='Enter password...'
        autoFocus
        {...register('password', { required: true })}
        className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
      </div>
      <button type="submit" id="submit" className="w-full bg-blue-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4">Sign In</button>
      <button onClick={()=>navigate('/signup')} className="w-full bg-green-700 hover:bg-green-900 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4">Sign Up</button>
      
    </form>
  );
};

export default SigninForm;

