import {  Fragment, useEffect, useState } from "react";
import { API_ENDPOINT } from "../config/constants";
import { Dialog, Transition } from "@headlessui/react";
import ArticleContent from "./articleContent";
// import { Dialog, Transition } from "@headlessui/react";

interface Article {
  date: string;
  id: number;
  sport: {
    id: number;
    name: string;
  };
  summary: string;
  teams: {
    id: number;
  }[];
  thumbnail: string;
  title: string;
}



const ArticleList: React.FC = () => {

  const [articles, setarticlesData] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const fetchAllArticles = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Matches fetching failed");
      }

      const articles = await response.json();
      console.log(articles);
      setarticlesData(articles);
    } catch (error) {
      console.error("Matches fetching failed: ", error);
    }
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);

  const formatDate = (dateString: string) => {
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-5/6 p-3">
        {articles.map((article) => (
          <div key={article.id} className="border rounded p-4  flex pb-10">
            <img
              src={article.thumbnail}
              alt="Article Thumbnail"
              className="h-20 rounded mr-4"
            />
             <div className="absolute pl-40 w-4/6 ">
            <h2 className="text-lg font-semibold  ">{article.title}</h2>
            <p className="text-sm text-gray-600 w-9/10 ">{article.summary}</p>
            <div className="flex justify-between ">
              <div className="text-gray-500">{formatDate(article.date)}</div>
              <button
                className="text-blue-500 cursor-pointer pb-5"
                onClick={() => setSelectedArticle(article)}
              >
                Read More
              </button>
            </div>
          </div>
          </div>
        ))}
      </div>

      <Transition.Root show={selectedArticle !== null} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 overflow-y-auto z-50"
          open={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <Dialog.Title className="text-lg font-semibold">
                  {selectedArticle?.title}
                  < ArticleContent articleId={selectedArticle?.id || 0}/>
                </Dialog.Title>
                <button
                  className="mt-4 text-blue-500 cursor-pointer"
                  onClick={() => setSelectedArticle(null)}
                >
                  Close
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ArticleList;
