import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ArticleContent from "./articleContent";
// import emptyListGif from "../../assets/emptyListGif.gif";
import { Article } from "../../context/articles/types";
import { fetchAllArticles } from "../../context/articles/action";
import { useArticleDispatch, useArticleState } from "../../context/articles/context";
import { useTranslation } from "react-i18next";

const ArticleList: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const auth = localStorage.getItem("authToken");
  const { t , i18n } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { Article }: any = useArticleState() || undefined;
  const dispatch = useArticleDispatch();
  const articles = Article;
  
  useEffect(() => {
    if (dispatch) {
      fetchAllArticles(dispatch);
    }
  }, [dispatch]);

  const userPreferencesString = localStorage.getItem("userPreferences") || "";
  const userPreferences = userPreferencesString ? JSON.parse(userPreferencesString) : null; 
  const sportsPreferences = userPreferences?.interestedGames || []; 

  const formatDate = (dateString: string) => {
    
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString(i18n.language, options);
    
    // return new Intl.DateTimeFormat(i18n.language).format(date);
    
  };

  // const formatDate = (dateString: string) => {
    // console.log(dateString);
    
  //   const options = { year: "numeric", month: "long", day: "numeric" } as const;
  //   return new Date(dateString).toLocaleDateString("en-US", options);
  // };

  const shouldShowPreferences = auth !== null;
  const shouldShowsportsPreferences = sportsPreferences.length;

  useEffect(() => {
    if (shouldShowPreferences && shouldShowsportsPreferences) {
      setSelectedSport("Preferences");
    } else {
      setSelectedSport("All Sports");
    }
  }, [shouldShowPreferences, shouldShowsportsPreferences]);

  const getFilteredArticles = () => {
    if (
      selectedSport === "Preferences" &&
      shouldShowPreferences &&
      userPreferences &&
      userPreferences.interestedGames
    ) {
      return articles.filter((article: Article) => {
        return sportsPreferences.includes(article.sport.name); 
      });
    } else if (selectedSport === null || selectedSport === "All Sports") {
      return articles;
    } else {
      return articles.filter((article: Article) => article.sport.name === selectedSport);
    }
  };

  const filteredArticles = getFilteredArticles();

  const filterArticlesBySport = (sportName: string | null) => {
    setSelectedSport(sportName);
  };



  

  return (
    <>
      <div className="flex flex-row w-full bg-white">
        <div className="flex flex-col gap-4 p-3">
          <div className="flex justify-between">
            <div className="flex flex-row">
              {auth && (
                <div className="">
                  <button
                    className={`text-cyan cursor-pointer py-2 px-4 rounded ${
                      selectedSport === "Preferences" ? "bg-slate-200" : "bg-white"
                    }`}
                    onClick={() => filterArticlesBySport("Preferences")}
                  >
                   {t("My Interests")}
                  </button>
                  <button
                    className={`text-cyan cursor-pointer py-2 px-4 rounded ${
                      selectedSport === null ? "bg-slate-200" : "bg-white"
                    }`}
                    onClick={() => filterArticlesBySport(null)}
                  >
                    {t("All Sports")}
                  </button>
                </div>
              )}
              {!auth && (
                <button
                  className={`text-cyan cursor-pointer py-2 px-4 rounded ${
                    selectedSport === null ? "bg-slate-200" : "bg-white"
                  }`}
                  onClick={() => filterArticlesBySport(null)}
                >
                  {t("All Sports")}
                </button>
              )}
              <button
                className={`text-cyan cursor-pointer py-2 px-4 rounded ${
                  selectedSport === "American Football" ? "bg-slate-200 " : "bg-white"
                }`}
                onClick={() => filterArticlesBySport("American Football")}
              >
                {t("American Football")}
              </button>
              <button
                className={`text-cyan cursor-pointer py-2 px-4 rounded ${
                  selectedSport === "Basketball" ? "bg-slate-200" : "bg-white"
                }`}
                onClick={() => filterArticlesBySport("Basketball")}
              >
                {t("Basketball")}
              </button>
              <button
                className={`text-cyan cursor-pointer py-2 px-4 rounded ${
                  selectedSport === "Rugby" ? "bg-slate-200" : "bg-white"
                }`}
                onClick={() => filterArticlesBySport("Rugby")}
              >
                {t("Rugby")}
              </button>
              <button
                className={`text-cyan cursor-pointer py-2 px-4 rounded ${
                  selectedSport === "Field Hockey" ? "bg-slate-200" : "bg-white"
                }`}
                onClick={() => filterArticlesBySport("Field Hockey")}
              >
                {t("Field Hockey")}
              </button>
              <button
                className={`text-cyan cursor-pointer py-2 px-4 rounded ${
                  selectedSport === "Table Tennis" ? "bg-slate-200" : "bg-white"
                }`}
                onClick={() => filterArticlesBySport("Table Tennis")}
              >
                {t("Table Tennis")}
              </button>
              <button
                className={`text-cyan cursor-pointer py-2 px-4 rounded ${
                  selectedSport === "Cricket" ? "bg-slate-200" : "bg-white"
                }`}
                onClick={() => filterArticlesBySport("Cricket")}
              >
                {t("Cricket")}
              </button>
            </div>
          </div>
          <div className="">
            {filteredArticles.length === 0 ? (
              <div className="flex items-center justify-center">
                {/* <img src={emptyListGif} alt="Empty List" className="pt-60 " /> */}
              </div>
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              filteredArticles.map((article: any) => (
                <div key={article.id} className="border rounded p-4 flex bg-slate-100">
                  <div className="w-36 flex justify-center items-center">
                    <img
                      src={article.thumbnail}
                      alt="Article Thumbnail"
                      className="h-20 rounded mr-4 "
                    />
                  </div>
                  <div className="w-5/6">
                    <div className="flex justify-between">
                    <h2 className="text-lg font-semibold">{article.title}</h2>
                    
                    </div>
                    <p className="text-sm text-gray-600 w-9/10">{article.summary}</p>

                    <div className="flex justify-between">
                      <div className="text-gray-500">{formatDate(article.date)}</div>
                      <button
                        className="text-blue-500 cursor-pointer pb-5"
                        onClick={() => setSelectedArticle(article)}
                      >
                        {t("Read More")}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
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
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <Dialog.Title className="text-lg font-semibold ">
                  <div>
                  {selectedArticle?.title}
                  <br />
                  <div className="font-light">
                  {formatDate(selectedArticle?.date || "")}
                  </div>
                  </div>
                 
                  <ArticleContent articleId={selectedArticle?.id || 0} />
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
