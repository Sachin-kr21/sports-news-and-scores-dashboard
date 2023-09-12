import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import emptyListGif from "../../assets/emptyListGif.gif";
import { useForm, SubmitHandler } from "react-hook-form";


const ProfilePage: React.FC = () => {
  interface User {
    id: number;
    name: string;
    email: string;
    preferences: {
      interestedGames: string[];
      interestedTeams: string[];
    };
  }

  type Inputs = {
    current_password : string,
    new_password : string
  };

  const token = localStorage.getItem("authToken") ?? "";
  const [userData, setUserData] = useState<User>();
  const { register , handleSubmit } = useForm<Inputs>();
  const [passwordUpdated, setPasswordUpdated] = useState(false); 

  const onSubmit : SubmitHandler<Inputs> = async (data) => {
    const {current_password,new_password} = data;
    console.log({"current_password":current_password,"new_password":new_password} );
    
    try {
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json',
        Authorization: token,
        
      },
        body: JSON.stringify( {"current_password":current_password,"new_password":new_password} ),
      });

      if (!response.ok) {
        throw new Error('Password updation failed');
      }

      console.log('Password updation successful');
      setPasswordUpdated(true); 
      setIsShown(!isShown);

    } catch (error) {
      console.error('Password updation failed:', error);
    }
  };

  async function fetchUserData() {
    try {
      const response = await fetch(`${API_ENDPOINT}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Fetching user details failed");
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
     
        console.error("Fetching user details failed:", error);
    }
  }

  const [isShown, setIsShown] = useState(false);

  const passwordInputField = () => {
    setIsShown(!isShown);

  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className=" min-h-screen p-4">
      <div className="bg-slate-400 text-white p-4 rounded">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      
        
      <div className="mt-4 bg-white p-4 rounded shadow flex justify-between">

        {userData && (
          
          <div >

            <p className="font-bold font-3xl">
              Name: <span>{userData.name}</span>
            </p>
            <p className="font-bold">
              Email: <span className="font-normal">{userData.email}</span>
            </p>
            <button onClick={passwordInputField} className="text-blue-500">Update Password</button>
            {isShown && 
            <div className="bg-slate-200 p-4 m-4 rounded">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div>
        <label className="block text-gray-700 font-semibold mb-2">Current Password:</label>
        <input type="password" 
        id="text"
        placeholder='Current Password...'
        autoFocus
        {...register('current_password', { required: true })}
        className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">New Password:</label>
        <input type="password" 
        id="text"
        placeholder='New Password...'
        autoFocus
        {...register('new_password', { required: true })}
        className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue " />
      </div>
                <div className="flex">
      

                <button className="p-2 w-20 bg-blue-400 rounded ml-36 mt-5 text-white" type="submit">Submit</button>
                <button className="p-2 w-20 bg-red-400 rounded ml-5 mt-5 text-white p-2" onClick={passwordInputField}>Cancel</button>
                </div>
                </form>

            </div>
            }
                        {passwordUpdated && (
        <div className="bg-green-300 p-4 m-4 rounded">
          Password updated successfully!
        </div>
      )}
            <p className="font-bold mt-2">Interested Games:</p>
            <ul>
              {userData.preferences.interestedGames.map((game, index) => (
                <li key={index} className="list-disc ml-4">
                  {game}
                </li>
              ))}
            </ul>
            <p className="font-bold mt-2">Interested Teams:</p>
            <ul>
              {userData.preferences.interestedTeams.map((team, index) => (
                <li key={index} className="list-disc ml-4">
                  {team}
                </li>
              ))}
            </ul>
          </div>
        )}
      
<div>

      <img src={emptyListGif} alt="Empty List" className=" bg-slate-200 rounded-full " />
</div>
        </div>
    </div>
  );
};

export default ProfilePage;
