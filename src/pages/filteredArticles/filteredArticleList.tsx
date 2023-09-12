import React, { Fragment, useEffect, useState } from "react";
import { Article } from "../../context/articles/types";
import { fetchAllArticles } from "../../context/articles/action";
import { useArticleDispatch, useArticleState } from "../../context/articles/context";
// import emptyListGif from "../../assets/emptyListGif.gif";
import Select from "react-select";
import { teamsData } from "../../context/data";
import { Dialog, Transition } from "@headlessui/react";
import ArticleContent from "../articles/articleContent";


const FilteredArticleList: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { Article }: any = useArticleState() || undefined;
  const dispatch = useArticleDispatch();
  const articles = Article;

  useEffect(() => {
    if (dispatch) {
      fetchAllArticles(dispatch);
    }
  }, [dispatch]);

  // type TeamOption = {
  //   value: string;
  //   label: string;
  // };
  
  const formatDate = (dateString: string) => {
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterArticlesByTeams = (selectedOptions: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectedTeamNames = selectedOptions.map((option: any) => option.value);
    setSelectedTeams(selectedTeamNames);
  };

  const filteredTeamArticles = selectedTeams.length
    ? articles.filter((article: Article) =>
        article.teams.some((team) => selectedTeams.includes(team.name))
      )
    : articles;

    const sportOptions = [
      { value: null, label: "All Sports" },
      ...teamsData
        .map((team) => team.plays)
        .filter((value, index, self) => self.indexOf(value) === index) 
        .map((sport) => ({ value: sport, label: sport })),
    ];

    const teamOptions = selectedSport
    ? [
        ...teamsData
          .filter((team) => team.plays === selectedSport)
          .map((team) => ({ value: team.name, label: team.name })),
      ]
    : [];
  

  return (
    <>
      <div className="flex flex-row w-full bg-white rounded">
        <div className="flex flex-col gap-4 p-3">
          <div className="flex gap-5">
            <h1 className="text-xl pl-4 font-bold text-gray-800 pt-1">Filter</h1>
            <Select
              placeholder="Select Sport..."
              className="w-full"
              options={sportOptions}
              value={sportOptions.find((option) => option.value === selectedSport)}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(selectedOption: any) => setSelectedSport(selectedOption.value)}
            />
          </div>
          {selectedSport && (
            <div className="flex gap-5">
              <h1 className="text-xl pl-4 font-bold text-gray-800 pt-1">Teams</h1>
              <Select
                placeholder="Select Teams..."
                className="w-full"
                isMulti
                options={teamOptions}
                value={teamOptions.filter((option) => selectedTeams.includes(option.value))}
                onChange={filterArticlesByTeams}
              />
            </div>
          )}

          <div className="">
            {filteredTeamArticles.length === 0 ? (
              <div className="flex items-center justify-center">
                {/* <img src={emptyListGif} alt="Empty List" className="pt-60 " /> */}
              </div>
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              filteredTeamArticles.map((article: any) => (
                <div key={article.id} className="border rounded p-4 flex bg-slate-100">
                  <div className="w-36 flex justify-center items-center">
                    <img src={article.thumbnail} alt="Article Thumbnail" className="h-20 rounded mr-4" />
                  </div>
                  <div className="w-5/6">
                    <h2 className="text-lg font-semibold">{article.title}</h2>
                    <p className="text-sm text-gray-600 w-9/10">{article.summary}</p>
                    <div className="flex justify-between">
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

export default FilteredArticleList;
