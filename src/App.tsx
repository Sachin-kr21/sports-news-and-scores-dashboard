// import { useState } from 'react'
import { RouterProvider } from "react-router-dom";
import router from './routes';

// import './App.css'

function App() {

  

  return (
    <div className="bg-blue-100">
            <RouterProvider router={router} />
      
    </div>
  )
}

export default App
