import { Article } from "./types";

export interface ArticleState {
    Article: Article[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
  }


export const initialState: ArticleState = {
    Article: [],
    isLoading: false,
    isError: false,
    errorMessage: ''
  };

export type ArticleActions = 
| { type: 'FETCH_ARTICLE_REQUEST' }
| { type: 'FETCH_ARTICLE_SUCCESS'; payload: Article[] }
| { type: 'FETCH_ARTICLE_FAILURE'; payload: string }

export const reducer = (state: ArticleState = initialState, action: ArticleActions): ArticleState => {
    switch (action.type) {
      case "FETCH_ARTICLE_REQUEST":
        return {
          ...state,
          isLoading: true
        };   
      case "FETCH_ARTICLE_SUCCESS":
        return {
          ...state,
          isLoading: false,
          Article: action.payload,
        };      
      case "FETCH_ARTICLE_FAILURE":
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


