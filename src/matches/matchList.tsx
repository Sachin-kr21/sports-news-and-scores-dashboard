import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../config/constants";
import { Team } from "../preferences/data";
import MatchItem from "./matchItem";

export interface Match {
  startsAt:string,
    endsAt: string,
    id: number,
    isRunning: boolean,
    location: string,
    name: string,
    sportName: string,
    teams:Team[],
    score:{
      [teamName: string]: string;
    },
    playingTeam:number,
    story:string
  
}



const MatchList: React.FC = () => {
  const [matchData, setMatchData] = useState<Match[]>([]);

  const auth = localStorage.getItem("authToken");
  // const pref = localStorage.getItem("userPreferences");
    // const userPreferences = JSON.parse(pref) || {};
  // const [flag , setFlag] = useState<number>(0);
  

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
      // console.log("matchData");
      
      
      if(auth){ 
      const pref = localStorage.getItem("userPreferences") || "";
      // const prefJSON = JSON.parse(pref)

        if(pref.length==2 || pref.length==43){
          
      setMatchData(matches.matches);
      
        }
        else{
          const filteredEvents = filterEvents(matches.matches , pref);
          // console.log("filterEvents",filterEvents);
          
          setMatchData(filteredEvents );
          
        }
      
      
      }
      else{
        setMatchData(matches.matches);
        
        
      }
      // console.log("matchData",matchData);
      
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


  // const fetchMatch = async () => {
  //   matchData.forEach((match) => {
  //     fetchMatchData(match.id);
  //     console.log(match.id);
  //   });
  // }

  // useEffect(() => {
  //   fetchMatch();
  //   setFlag(1);
  //   // console.log(1);
    
  // }, []);
  
  // border-gray-200 dark:bg-gray-900
  return (
    <div className="flex items-center bg-blue-100 w-full">
      <div className="flex items-center justify-start max-w-screen-xl p-4">
        <div className="flex flex-nowrap overflow-x-scroll p-4">
          {matchData.map((match) => (
            <MatchItem key={match.id} match={match}  /> // Pass fetchMatchData here
          ))}
        </div>
      </div>
    </div>
  );

};

export default MatchList;
