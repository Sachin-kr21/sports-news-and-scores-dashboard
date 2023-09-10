import { API_ENDPOINT } from "../../config/constants";
import { ArticleDispatch } from "./context";

export const fetchAllArticles = async (dispatch: ArticleDispatch) => {
    try {
    dispatch({ type: "FETCH_ARTICLE_REQUEST" });

      const response = await fetch(`${API_ENDPOINT}/articles`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Articles fetching failed");
      }

      const data = await response.json();
      console.log("All Articles Fetched");
      dispatch({ type: "FETCH_ARTICLE_SUCCESS", payload: data });

      
    } catch (error) {
      console.error("Articles fetching failed: ", error);
      dispatch({ type: "FETCH_ARTICLE_FAILURE", payload: "Unable to load articles" });

    }
  };