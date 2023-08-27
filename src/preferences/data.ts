import { API_ENDPOINT } from "../config/constants";

async function fetchSports() {
  try {
    const response = await fetch(`${API_ENDPOINT}/sports`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}
    });

    if (!response.ok) {
      throw new Error('Fetching sports failed');
    }

    const data = await response.json();
    return data.sports; 

  } catch (error) {
    console.error('Fetching sports failed:', error);
    return []; 
  }
}

export const sportsData: Sport[] = [];

async function populateSportsData() {
  const fetchedSports = await fetchSports();
  sportsData.push(...fetchedSports);
}

populateSportsData();

async function fetchTeams() {
  try {
    const response = await fetch(`${API_ENDPOINT}/teams`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}
    });

    if (!response.ok) {
      throw new Error('Fetching teams failed');
    }

    const data = await response.json();
    // console.log("teams",data);
    return data;

  } catch (error) {
    console.error('Fetching sports failed:', error);
    return [];
  }
}
  


export const teamsData: Team[] = [];

async function populateTeamsData() {
  const fetchedTeams = await fetchTeams();
  teamsData.push(...fetchedTeams);
}

populateTeamsData();

  // export const teamsData: Team[] = [
  //   {
  //     id: 1,
  //     name: 'Thunderbolts',
  //     plays: 'Basketball'
  //   },
  //   {
  //     id: 2,
  //     name: 'Dragonslayers',
  //     plays: 'Basketball'
  //   },
  //   {
  //     id: 3,
  //     name: 'Phoenix Rising',
  //     plays: 'Basketball'
  //   },
  //   {
  //     id: 4,
  //     name: 'Avalanche',
  //     plays: 'Basketball'
  //   },
  //   {
  //     id: 5,
  //     name: 'Titans',
  //     plays: 'American Football'
  //   },
  //   {
  //     id: 6,
  //     name: 'Vortex Vipers',
  //     plays: 'American Football'
  //   },
  //   {
  //     id: 7,
  //     name: 'Spectral Shadows',
  //     plays: 'American Football'
  //   },
  //   {
  //     id: 8,
  //     name: 'Blitzkrieg',
  //     plays: 'American Football'
  //   },
  //   {
  //     id: 9,
  //     name: 'Fury United',
  //     plays: 'Rugby'
  //   },
  //   {
  //     id: 10,
  //     name: 'Lightning Strikes',
  //     plays: 'Rugby'
  //   },
  //   {
  //     id: 11,
  //     name: 'Serpents of Fire',
  //     plays: 'Rugby'
  //   },
  //   {
  //     id: 12,
  //     name: 'Galaxy Warriors',
  //     plays: 'Rugby'
  //   },
  //   {
  //     id: 13,
  //     name: 'Stormbreakers',
  //     plays: 'Field Hockey'
  //   },
  //   {
  //     id: 14,
  //     name: 'Enigma Enforcers',
  //     plays: 'Field Hockey'
  //   },
  //   {
  //     id: 15,
  //     name: 'Blaze Squadron',
  //     plays: 'Field Hockey'
  //   },
  //   {
  //     id: 16,
  //     name: 'Phantom Phantoms',
  //     plays: 'Field Hockey'
  //   },
  //   {
  //     id: 17,
  //     name: 'Celestial Chargers',
  //     plays: 'Table Tennis'
  //   },
  //   {
  //     id: 18,
  //     name: 'Rebel Renegades',
  //     plays: 'Table Tennis'
  //   },
  //   {
  //     id: 19,
  //     name: 'Inferno Ignitors',
  //     plays: 'Table Tennis'
  //   },
  //   {
  //     id: 20,
  //     name: 'Stealth Strikers',
  //     plays: 'Table Tennis'
  //   },
  //   {
  //     id: 21,
  //     name: 'Nova Knights',
  //     plays: 'Cricket'
  //   },
  //   {
  //     id: 22,
  //     name: 'Crimson Crushers',
  //     plays: 'Cricket'
  //   },
  //   {
  //     id: 23,
  //     name: 'Rapid Raptors',
  //     plays: 'Cricket'
  //   },
  //   {
  //     id: 24,
  //     name: 'Shadow Assassins',
  //     plays: 'Cricket'
  //   }
  // ];
  
  export interface Team {
    id: number;
    name: string;
    plays: string;
  }

  export interface Sport {
    id : number;
    name: string;
  }
  