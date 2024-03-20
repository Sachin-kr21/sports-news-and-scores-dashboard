import React, { useState, useEffect } from "react";
import { sportsData, teamsData, Sport, Team } from "../../context/data";
import { API_ENDPOINT } from "../../config/constants";
import { useMatchDispatch } from "../../context/matches/context";
import { fetchAllMatches } from "../../context/matches/action";
import { fetchAllArticles } from "../../context/articles/action";
import { useArticleDispatch } from "../../context/articles/context";
import { useTranslation } from "react-i18next";

interface PreferencesPageProps {
  closeModal: () => void;
}

const PreferencesPage: React.FC<PreferencesPageProps> = ({ closeModal }) => {
  const [selectedSports, setSelectedSports] = useState<Sport[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const dispatch = useMatchDispatch();
  const dispatchArticles = useArticleDispatch();
const {t} = useTranslation();
  useEffect(() => {
    const userPreferencesString = localStorage.getItem("userPreferences") || "";
    const userPreferences = userPreferencesString
      ? JSON.parse(userPreferencesString)
      : null;

    if (userPreferences) {
      setSelectedSports(
        sportsData.filter((sport) =>
          userPreferences.interestedGames.includes(sport.name)
        )
      );

      setSelectedTeams(
        teamsData.filter((team) =>
          userPreferences.interestedTeams.includes(team.name)
        )
      );
    }
  }, []);

  const handleSportChange = (sport: Sport) => {
    if (selectedSports.some((item) => item.id === sport.id)) {
      setSelectedSports(selectedSports.filter((item) => item.id !== sport.id));
    } else {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const handleTeamChange = (team: Team) => {
    if (selectedTeams.some((item) => item.id === team.id)) {
      setSelectedTeams(selectedTeams.filter((item) => item.id !== team.id));
    } else {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  const handleSave = async () => {
    const selectedSportsNames = selectedSports.map((sport) => sport.name);
    const selectedTeamsNames = selectedTeams.map((team) => team.name);

    const selectedData = {
      preferences: {
        interestedGames: selectedSportsNames,
        interestedTeams: selectedTeamsNames,
      },
    };

    if (selectedData.preferences.interestedGames.length === 0 && selectedData.preferences.interestedTeams.length === 0) {
      console.log("No Preferences Selected");
      window.alert("No Preferences Selected");
    } else {
      const token = localStorage.getItem("authToken") ?? "";
      try {
        const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(selectedData),
        });

        if (!response.ok) {
          throw new Error("preferences updation failed");
        }

        const preferences = JSON.stringify(selectedData.preferences);
        localStorage.setItem("userPreferences", preferences);
        console.log("preferences updation successful");
        if (dispatch) fetchAllMatches(dispatch);
        if (dispatchArticles) fetchAllArticles(dispatchArticles);

        closeModal();
      } catch (error) {
        console.error("preferences updation failed:", error);
      }
    }
  };

  const handleReset = async () => {
    const resetData = {
      preferences: {
        interestedGames: [],
        interestedTeams: [],
      },
    };

    const token = localStorage.getItem("authToken") ?? "";
    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(resetData),
      });

      if (!response.ok) {
        throw new Error("preferences updation failed");
      }
      const preferences = JSON.stringify(resetData.preferences);
      localStorage.setItem("userPreferences", preferences);
      console.log("preferences reset successful");
      if (dispatch) fetchAllMatches(dispatch);
      if (dispatchArticles) fetchAllArticles(dispatchArticles);

      closeModal();
    } catch (error) {
      console.error("preferences reset failed:", error);
    }
  };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">{t("Preferences")}</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">{t("Sports")}</h2>
        {sportsData.map((sport) => (
          <label key={sport.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedSports.some((item) => item.id === sport.id)}
              onChange={() => handleSportChange(sport)}
            />
            {t(sport.name)}
          </label>
        ))}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">{t("Teams")}</h2>
        {teamsData.map((team) => (
          <label key={team.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedTeams.some((item) => item.id === team.id)}
              onChange={() => handleTeamChange(team)}
            />
            {team.name} - {t(team.plays)}
          </label>
        ))}
      </div>
      <div className="flex space-x-4">
        <button
          className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
          onClick={handleSave}
        >
          {t("Save")}
        </button>
        <button
          className="mt-4 py-2 px-4 bg-red-500 hover:bg-red-900 text-white rounded-md   "
          onClick={handleReset}
        >
          {t("Reset")}
        </button>
      </div>
    </div>
  );
};

export default PreferencesPage;
