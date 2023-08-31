import Articles from "../articles";
import Appbar from "../layouts";
import Matches from "../matches";

const Dashboard: React.FC = () => {
    // Dialogue 2: And use it after the h2 tag
    return (
      <div className="pl-20 pr-20">
      
      <div >
          <Appbar/>
          
      </div>
      <div >
        <Matches />
      </div>
        <Articles />
      </div>
    );
  }

export default Dashboard;