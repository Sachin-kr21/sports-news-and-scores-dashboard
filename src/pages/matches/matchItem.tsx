import React, { useEffect, useState } from 'react';
import { API_ENDPOINT } from '../../config/constants';

interface Match {
  id: number; 
  sportName: string;
  location: string;
  teams: {
    name: string; 
  }[];
  score?: {
    [key: string]: number | undefined | string; 
  };
}

interface MatchItemProps {
  match: Match;
  isRunning : boolean;
}



const MatchItem: React.FC<MatchItemProps> = ({ match , isRunning}) => {

  const [matchData, setMatchData] = useState<Match>(match);

    // sessionStorage.setItem("sachin","ruby");
    const fetchMatchData = async () => {
        try {
          const response = await fetch(`${API_ENDPOINT}/matches/${matchData.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
    
          if (!response.ok) {
            throw new Error("Match data fetching failed");
          }
    
          const updatedMatch = await response.json();
        //   const updatedMatches = matchData.map((match) =>
        //     match.id === matchId ? updatedMatch : match
        //   );
    
          setMatchData(updatedMatch);
          console.log("Match Updated");
          
        } catch (error) {
          console.error("Match data fetching failed: ", error);
        }
      };
      

    useEffect(() => {
        fetchMatchData(); 
        
        
      }, []);

  return (
    <div
      key={match.id}
      className="bg-white rounded-md p-4 shadow-md border border-gray-500 mx-2 relative"
      style={{ width: "50%", minWidth: "200px", maxWidth: "400px" }}
    >
      <div className="absolute top-2 right-2">
        {isRunning &&
      <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-500 cursor-pointer"
                  onClick={() => fetchMatchData()}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>}
      </div>
      <h3 className="font-semibold text-sm mb-1">{matchData.sportName}</h3>
      <p className="text-gray-600 text-xs mb-2">{matchData.location}</p>

      <div>
        {matchData.teams.map((team, index) => (
          <p key={index} className="text-gray-600 text-sm flex justify-between">
            {team.name}

            <span className=''>{matchData.score !== undefined ? matchData.score[team.name] : ""}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default MatchItem;
