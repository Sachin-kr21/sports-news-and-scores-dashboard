import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
// import { Article } from "../../context/articles/types";

interface ArticleContentProps {
  articleId: number;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ articleId }) => {
  const [articleContent, setArticleContent] = useState("");
  const [articleImage, setArticleImage] = useState<string | null>(null);

  const fetchArticleContent = async (articleId: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${articleId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Article fetching failed");
      }

      const article = await response.json();
      console.log("Article Content Fetched");

      setArticleContent(article.content);
      setArticleImage(article.thumbnail);
    } catch (error) {
      console.error("Article fetching failed: ", error);
    }
  };

  useEffect(() => {
    fetchArticleContent(articleId);
  }, [articleId]);

  return (
    <>
      <div className="font-light">
        {articleImage && <img src={articleImage} alt="Article Thumbnail" className="mb-4 w-full  rounded pt-2 " />}

        {articleContent}
      </div>
    </>
  );
};

export default ArticleContent;
