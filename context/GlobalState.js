import { GlobalContext } from "./useAppContext";
import { useState } from "react";

const GlobalState = ({ children }) => {
  const [popular, setPopular] = useState();
  const [upcoming, setUpcoming] = useState();
  const [newGames, setNewGames] = useState();
  const [gameDetail, setGameDetail] = useState();
  const [screenshots, setScreenshots] = useState();
  const [searchInput, setSearchInput] = useState();
  const [searchedData, setSearchedData] = useState();
  const [viewAllData, setViewAllData] = useState()

  return (
    <GlobalContext.Provider
      value={{
        popular,
        setPopular,
        upcoming,
        setUpcoming,
        newGames,
        setNewGames,
        gameDetail,
        setGameDetail,
        screenshots,
        setScreenshots,
        searchInput,
        setSearchInput,
        searchedData,
        setSearchedData,
        viewAllData,
        setViewAllData
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
