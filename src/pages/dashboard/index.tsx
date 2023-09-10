import Articles from "../articles";
import Appbar from "../layouts";
import Matches from "../matches";

const Dashboard: React.FC = () => {
    return (
      <div className="">
      
      <div >
          <Appbar/>
          
      </div>
      <div className="pl-10 pr-20">
        <Matches  />
      </div>
      <div className="pl-10 pr-20 flex gap-5">
        <div className="w-8/12">
          <Articles />
        </div>
        <div className="bg-black flex-1 p">
         
        </div>
      </div>
    </div> 
    );
  }

export default Dashboard;