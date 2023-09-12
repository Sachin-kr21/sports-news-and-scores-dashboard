import Appbar from "../layouts";
import ProfilePage from "./profilePage";

const Profile: React.FC = () => {
    return(
        <>
        <div className="">
      
      <div >
          <Appbar/>
          
      </div>

<div className="pl-10 pr-20 " >
    <ProfilePage />
</div>

      </div>

        </>
    )
}

export default Profile;