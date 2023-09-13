import React, { useEffect } from "react";
import MatchItem from "./matchItem";
import { Match } from "../../context/matches/types";
import { useMatchDispatch, useMatchState } from "../../context/matches/context";
import { fetchAllMatches } from "../../context/matches/action";

const MatchList: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { Match }: any = useMatchState();
  const dispatch = useMatchDispatch();
  const matchData = Match;
  useEffect(() => {
    if (dispatch) {
      fetchAllMatches(dispatch);
    }
  }, [dispatch]);
  
  const sortedMatchData = matchData.slice().sort((a: Match, b: Match) => {
    if (a.isRunning && !b.isRunning) {
      return -1; 
    } else if (!a.isRunning && b.isRunning) {
      return 1; 
    } else {
      return 0; 
    }
  });

  console.log("sortedMatchData",sortedMatchData);
  
  return (
    <div className="flex items-center bg-blue-100 w-full ">
      <div className="flex items-center justify-start max-w-full  p-4 ">
        <div className="flex flex-nowrap overflow-x-scroll p-4 ">
          {sortedMatchData.map((match: Match) => (
            <MatchItem key={match.id} match={match} isRunning={match.isRunning} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchList;
