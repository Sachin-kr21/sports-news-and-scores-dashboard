import { Link } from "react-router-dom";

function Notfound() {

    return (
      <div className="text-center pt-40 pr-15">
        <h2 className="text-align font-bold text-5xl">
            Page Not Found
        </h2>
       <button id="backToHomeButton" className="bg-green-300 p-3 mt-20 rounded shadow">
            <Link to="/">
             backToHomeButton
            </Link>
       </button>
      </div>
    );
  }
  export default Notfound;