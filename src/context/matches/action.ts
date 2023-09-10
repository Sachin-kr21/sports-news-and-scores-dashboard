import { API_ENDPOINT } from "../../config/constants";
import { MatchDispatch } from "./context";
import { Match } from "./types";

export const fetchAllMatches = async (dispatch: MatchDispatch) => {

  const auth = localStorage.getItem("authToken") ?? "";

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

    try {
    dispatch({ type: "FETCH_MATCH_REQUEST" });

      const response = await fetch(`${API_ENDPOINT}/matches`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Matches fetching failed");
      }

      const data = await response.json();
      console.log("All Matches Fetched");


      if(auth){ 
      const pref = localStorage.getItem("userPreferences") || "";

        if(pref.length==2 || pref.length==43){
          
            dispatch({ type: "FETCH_MATCH_SUCCESS", payload: data.matches });
      
        }
        else{
          const filteredEvents = filterEvents(data.matches , pref);
          // console.log("filterEvents",filterEvents);
          
      dispatch({ type: "FETCH_MATCH_SUCCESS", payload: filteredEvents });
          
        }
      
      
      }
      else{
        
      dispatch({ type: "FETCH_MATCH_SUCCESS", payload: data.matches });
        
      }

      

      // console.log("matchData");
      
      
    //   if(auth){ 
    //   const pref = localStorage.getItem("userPreferences") || "";
    //   // const prefJSON = JSON.parse(pref)

    //     if(pref.length==2 || pref.length==43){
          
    //   setMatchData(matches.matches);
      
    //     }
    //     else{
    //       const filteredEvents = filterEvents(matches.matches , pref);
    //       // console.log("filterEvents",filterEvents);
          
    //       setMatchData(filteredEvents );
          
    //     }
      
      
    //   }
    //   else{
    //     setMatchData(matches.matches);
        
        
    //   }
      // console.log("matchData",matchData);
      
    } catch (error) {
      console.error("Matches fetching failed: ", error);
    dispatch({ type: "FETCH_MATCH_FAILURE", payload: 'Unable to load matches' });

    }
  };