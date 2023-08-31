import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../config/constants";

interface ArticleDetailsProps {
  articleId: number;
}

const ArticleContent: React.FC<ArticleDetailsProps> = ({ articleId }) => {
  const [articleContent , setArticleContent] = useState("");
    const fetchArticleContent = async (articleId:number ) => {
      // console.log(articleId);
      
        try {
          const response = await fetch(`${API_ENDPOINT}/articles/${articleId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
    
          if (!response.ok) {
            throw new Error("Matches fetching failed");
          }
    
          const article = await response.json();
          // console.log("article",article.content);
      console.log("Article Content Fetched");

          setArticleContent(article.content);
        } catch (error) {
          console.error("Matches fetching failed: ", error);
        }
      };

      useEffect(()=>{
        fetchArticleContent(articleId)
    },[articleId])
    return(
        <>.
        <div className="font-light">
{articleContent}
</div>
        </>
    )
}

export default ArticleContent;