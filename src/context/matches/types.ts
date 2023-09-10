import { Team } from "../../pages/preferences/data";

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