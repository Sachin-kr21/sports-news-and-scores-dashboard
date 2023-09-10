// import { useState } from 'react'
import { RouterProvider } from "react-router-dom";
import router from './routes';
import { MatchProvider } from "./context/matches/context";
import { ArticleProvider } from "./context/articles/context";

// import './App.css'

function App() {

  

  return (
    <div className="bg-blue-100">

<MatchProvider>
<ArticleProvider>

            <RouterProvider router={router} />
</ArticleProvider>
</MatchProvider>


      
    </div>
  )
}

export default App
