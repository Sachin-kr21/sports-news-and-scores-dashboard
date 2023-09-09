import { Match } from "./types";

export interface MatchState {
    Match: Match[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
  }


export const initialState: MatchState = {
    Match: [],
    isLoading: false,
    isError: false,
    errorMessage: ''
  };

export type MatchActions = 
| { type: 'FETCH_MATCH_REQUEST' }
| { type: 'FETCH_MATCH_SUCCESS'; payload: Match[] }
| { type: 'FETCH_MATCH_FAILURE'; payload: string }

export const reducer = (state: MatchState = initialState, action: MatchActions): MatchState => {
    switch (action.type) {
      case "FETCH_MATCH_REQUEST":
        return {
          ...state,
          isLoading: true
        };   
      case "FETCH_MATCH_SUCCESS":
        return {
          ...state,
          isLoading: false,
          Match: action.payload,
        };      
      case "FETCH_MATCH_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true, 
          errorMessage: action.payload
        };          
      default:
        return state;
    }
  }


