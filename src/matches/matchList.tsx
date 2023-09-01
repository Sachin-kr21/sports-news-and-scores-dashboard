import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../config/constants";
import { Team } from "../preferences/data";

interface Match {
  endsAt: string;
  id: number;
  isRunning: boolean;
  location: string;
  name: string;
  sportName: string;
  teams: Team[];
}

const MatchList: React.FC = () => {
  const [matchData, setMatchData] = useState<Match[]>([]);
  const auth = localStorage.getItem("authToken");
  // const pref = localStorage.getItem("userPreferences");
    // const userPreferences = JSON.parse(pref) || {};
  

  const fetchMatchData = async (matchId: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${matchId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Match data fetching failed");
      }

      const updatedMatch = await response.json();
      const updatedMatches = matchData.map((match) =>
        match.id === matchId ? updatedMatch : match
      );

      setMatchData(updatedMatches);
      console.log("Match Updated");
      
    } catch (error) {
      console.error("Match data fetching failed: ", error);
    }
  };

  const fetchAllMatches = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/matches`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Matches fetching failed");
      }

      const matches = await response.json();
      console.log("All Matches Fetched");
      
      
      if(auth){ 
      const pref = localStorage.getItem("userPreferences") || "";
      // const prefJSON = JSON.parse(pref)

        if(pref.length==2 || pref.length==43){
          
      setMatchData(matches.matches);
        }
        else{
          const filteredEvents = filterEvents(matches.matches , pref);
          console.log("filterEvents",filterEvents);
          
          setMatchData(filteredEvents );
        }
      
      
      }
      else{
        setMatchData(matches.matches);
      }
    } catch (error) {
      console.error("Matches fetching failed: ", error);
    }
  };

  const filterEvents = (events: Match[] , pref : string ) => {
    const userPreferences = JSON.parse(pref) 
    return events.filter((event) => {
      const sportMatches = userPreferences.interestedGames.includes(event.sportName);
      const teamMatches = event.teams.some((team) =>
        userPreferences.interestedTeams.includes(team.name)
      );

      return sportMatches || teamMatches;
    });
  };

  useEffect(() => {
    fetchAllMatches();
  }, []);
  // border-gray-200 dark:bg-gray-900
  return (
    <div className="flex items-center bg-blue-100 w-full">
      <div className="flex items-center justify-start max-w-screen-xl p-4">
        <div className="flex flex-nowrap overflow-x-scroll p-4">
          {matchData.map((match) => (
            <div
              key={match.id}
              className="bg-white rounded-md p-4 shadow-md border border-gray-200 mx-2 relative"
              style={{ width: "50%", minWidth: "200px", maxWidth: "400px" }}
            >
              <div className="absolute top-2 right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-500 cursor-pointer"
                  onClick={() => fetchMatchData(match.id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-sm mb-1">{match.sportName}</h3>
              <p className="text-gray-600 text-xs mb-2">{match.location}</p>
              {match.teams.length === 1 ? (
                <p className="text-gray-600 text-sm">{match.teams[0].name}</p>
              ) : (
                <div>
                  {match.teams.map((team, index) => (
                    <p key={index} className="text-gray-600 text-sm">
                      {team.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchList;
