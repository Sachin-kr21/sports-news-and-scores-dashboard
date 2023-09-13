import { API_ENDPOINT } from "../../config/constants";
import { MatchDispatch } from "./context";
import { Match } from "./types";

export const fetchAllMatches = async (dispatch: MatchDispatch) => {

  const auth = localStorage.getItem("authToken") ?? "";

 const filterEvents = (events: Match[] , pref : string ) => {
    const userPreferences = JSON.parse(pref) 
    // console.log("userPreferences",userPreferences.preferredTeams);
    
    return events.filter((event) => {
      const sportMatches = userPreferences.interestedGames.includes(event.sportName);
      const teamMatches = event.teams.some((team) =>
        userPreferences.interestedTeams.includes(team.name)
      );

      return sportMatches || teamMatches;
    });
  };
// console.log(4);

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

      // console.log("data",data);
      
      if(auth){ 
      const pref = localStorage.getItem("userPreferences") || "";
        // console.log("hello" , pref.length);
        
        if(pref.length==2 || pref.length==43 || pref.length==0){
          
            dispatch({ type: "FETCH_MATCH_SUCCESS", payload: data.matches });
          // console.log(1);
          
        }
        else{
          // console.log(2,pref);
          const filteredEvents = filterEvents(data.matches , pref);
          // console.log("filterEvents",filterEvents);

          
      dispatch({ type: "FETCH_MATCH_SUCCESS", payload: filteredEvents });
          
        }
      
      
      }
      else{
        
      dispatch({ type: "FETCH_MATCH_SUCCESS", payload: data.matches });
      // console.log(3);
        
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