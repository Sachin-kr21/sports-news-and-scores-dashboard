import React, { useEffect, useState } from "react";
import { Article } from "../../context/articles/types";
import { fetchAllArticles } from "../../context/articles/action";
import { useArticleDispatch, useArticleState } from "../../context/articles/context";
import emptyListGif from "../../assets/emptyListGif.gif";
import Select  from "react-select";
import { teamsData } from "../../context/data";

const FilteredArticleList: React.FC = () => {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { Article }: any = useArticleState() || undefined;
  const dispatch = useArticleDispatch();
  const articles = Article;

  useEffect(() => {
    if (dispatch) {
      fetchAllArticles(dispatch);
    }
  }, [dispatch]);

  type TeamOption = {
    value: string;
    label: string;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterArticlesByTeams = (selectedOptions: any) => {
    const selectedTeamNames = selectedOptions.map((option: TeamOption) => option.value);
    setSelectedTeams(selectedTeamNames);
  };

  const filteredTeamArticles = selectedTeams.length
    ? articles.filter((article: Article) =>
        article.teams.some((team) => selectedTeams.includes(team.name))
      )
    : articles;


  // const Teams = teamsData
  // console.log("Teams",Teams);
  
  const teamOptions = [
    { value: "All Teams", label: "All Teams" },
    ...teamsData.map((team) => ({ value: team.name, label: team.name })),
  ];


  return (
    <>
      <div className="flex flex-row w-full bg-white">
        <div className="flex flex-col gap-4 p-3">
          <div className="flex gap-5 ">
            <h1 className="text-xl pl-4 font-bold text-gray-800 pt-1">Filter</h1> 
            <Select
            placeholder="Teams.."
            className="w-full"
              isMulti
              options={teamOptions}
              value={teamOptions.filter((option) => selectedTeams.includes(option.value))}
              onChange={filterArticlesByTeams}
            />
          </div>

          <div className="">
            {filteredTeamArticles.length === 0 ? (
              <div className="flex items-center justify-center">
                <img src={emptyListGif} alt="Empty List" className="pt-60 " />
              </div>
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              filteredTeamArticles.map((article: any) => (
                <div key={article.id} className="border rounded p-4 flex bg-slate-100">
                  <div className="w-36 flex justify-center items-center">
                    <img
                      src={article.thumbnail}
                      alt="Article Thumbnail"
                      className="h-20 rounded mr-4"
                    />
                  </div>
                  <div className="w-5/6">
                    <h2 className="text-lg font-semibold">{article.title}</h2>
                    <p className="text-sm text-gray-600 w-9/10">{article.summary}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilteredArticleList;
