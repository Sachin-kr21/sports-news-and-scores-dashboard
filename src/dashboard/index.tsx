import Appbar from "../layouts";
import Matches from "../matches";

const Dashboard: React.FC = () => {
    // Dialogue 2: And use it after the h2 tag
    return (
      <div className="">
      
      <div >
          <Appbar/>
          
      </div>
      <div >
        <Matches />
      </div>
      </div>
    );
  }

export default Dashboard;