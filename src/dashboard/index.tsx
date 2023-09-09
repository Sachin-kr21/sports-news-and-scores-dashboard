import Articles from "../articles";
import Appbar from "../layouts";
import Matches from "../matches";

const Dashboard: React.FC = () => {
    return (
      <div className="">
      
      <div >
          <Appbar/>
          
      </div>
      <div className="pl-10">
        <Matches  />
      </div>
      <div className="flex pl-10"> 
        <div>
          <Articles />

        </div>
          
        
      </div>
    </div>        
    );
  }

export default Dashboard;