import React, {  useState } from "react";
import { sportsData, teamsData, Sport, Team } from "./data";
import { API_ENDPOINT } from "../config/constants";
import { useMatchDispatch } from "../context/matches/context";
import { fetchAllMatches } from "../context/matches/action";

interface PreferencesPageProps {
  closeModal: () => void;
}

const PreferencesPage: React.FC<PreferencesPageProps> = ({ closeModal }) => {
  const [selectedSports, setSelectedSports] = useState<Sport[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const dispatch = useMatchDispatch();

  const handleSportChange = (sport: Sport) => {
    if (selectedSports.some((item) => item.id === sport.id)) {
      setSelectedSports(selectedSports.filter((item) => item.id !== sport.id));
    } else {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const handleTeamChange = (team: Team) => {
    if (selectedTeams.some((item) => item.id === team.id)) {
      setSelectedTeams(selectedTeams.filter((item) => item.id !== team.id));
    } else {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  const handleSave = async () => {
    const selectedSportsNames = selectedSports.map((sport) => sport.name);
    const selectedTeamsNames = selectedTeams.map((team) => team.name);

    const selectedData = {
      preferences: {
        interestedGames: selectedSportsNames,
        interestedTeams: selectedTeamsNames,
      },
    };
    
    // console.log("selectedData",selectedData.preferences.interestedGames.length,selectedData.preferences.interestedTeams.length);
    
    // const auth = localStorage.getItem("authToken")
    // console.log("Selected Data:", JSON.stringify(selectedData, null, 2));
    if(selectedData.preferences.interestedGames.length==0 && selectedData.preferences.interestedTeams.length==0){
      console.log("No Preferences Selected");
      window.alert("No Preferences Selected");
    }
    else{
    const token = localStorage.getItem("authToken") ?? "";
    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedData),
      });

      if (!response.ok) {
        throw new Error("preferences updation failed");
      }
      
      const preferences = JSON.stringify(selectedData.preferences);
      localStorage.setItem("userPreferences", preferences);
      console.log("preferences updation successful");
      if(dispatch)
    fetchAllMatches(dispatch);
      
      
      closeModal();
    } catch (error) {
      console.error("preferences updation failed:", error);
    }
  }
    // console.log({Sport,Team});

    // console.log('Selected Data:', JSON.stringify(selectedData));

    // console.log('Selected Data:', JSON.stringify(selectedData));
    // console.log('Selected Teams:', selectedTeams);
  };

  const handleReset = async () => {

    const resetData = {
      preferences: {
        interestedGames: [],
        interestedTeams: [],
      },
    };
        
    const token = localStorage.getItem("authToken") ?? "";
    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(resetData),
      });

      if (!response.ok) {
        throw new Error("preferences updation failed");
      }
      const preferences = JSON.stringify(resetData.preferences);
      localStorage.setItem("userPreferences", preferences);
      console.log("preferences reset successful");
      if(dispatch)
      fetchAllMatches(dispatch);

      closeModal();
    } catch (error) {
      console.error("preferences reset failed:", error);
    }
    
  };

  // const handleReset = async () => {
  //   console.log("selectedData",selectedData);
    
  //   };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Preferences</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Sports</h2>
        {sportsData.map((sport) => (
          <label key={sport.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedSports.some((item) => item.id === sport.id)}
              onChange={() => handleSportChange(sport)}
            />
            {sport.name}
          </label>
        ))}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Teams</h2>
        {teamsData.map((team) => (
          <label key={team.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedTeams.some((item) => item.id === team.id)}
              onChange={() => handleTeamChange(team)}
            />
            {team.name} - {team.plays}
          </label>
        ))}
      </div>
      <div className="flex space-x-4">
      <button
        className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        className="mt-4 py-2 px-4 bg-red-500 hover:bg-red-900 text-white rounded-md   "
        onClick={handleReset}
      >
        Reset
      </button>
      </div>
    </div>
  );
};

export default PreferencesPage;
