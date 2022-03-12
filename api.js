import { RAWG_API_KEY } from "@env";
//Base url
const base_url = "https://api.rawg.io/api/";

//Getting Dates
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};
const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};

//Current day/month/year
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

//Popular Games
const popular_games = `games?key=${RAWG_API_KEY}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
const upcoming_games = `games?key=${RAWG_API_KEY}&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;
const newGames = `games?key=${RAWG_API_KEY}&dates=${lastYear},${currentDate}&ordering=-released&page_size=10`;

export const popularGamesURL = () => `${base_url}${popular_games}`;
export const upcomingGamesURL = () => `${base_url}${upcoming_games}`;
export const newGamesURL = () => `${base_url}${newGames}`;

//Game details
export const gameDetailsURL = (game_id) =>
  `${base_url}games/${game_id}?key=${RAWG_API_KEY}`;

//screenshots
export const gameScreenshotURL = (game_id) =>
  `${base_url}games/${game_id}/screenshots?key=${RAWG_API_KEY}`;

//searched game
export const searchGameURL = (game_name) =>
  `${base_url}games?key=${RAWG_API_KEY}&search=${game_name}&page_size=9`;

//media resize
export const mediaResizer = (imgUrl, size) => {
  if (imgUrl) {
    const image = imgUrl.includes("/media/screenshots/")
      ? imgUrl.replace(
          "media/screenshots",
          `media/resize/${size}/-/screenshots`
        )
      : imgUrl.replace("/media/games/", `/media/resize/${size}/-/games/`);
    return image;
  }
};
