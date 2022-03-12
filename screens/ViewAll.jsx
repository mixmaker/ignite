import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { newGamesURL, popularGamesURL, upcomingGamesURL } from "../api";
import axios from "axios";
import useAppContext from "../context/useAppContext";
import CardLarge from "../components/CardLarge";

const ViewAll = ({ navigation, route }) => {
  const { name } = route.params;
  const { viewAllData, setViewAllData } = useAppContext();

  const fetchAllData = async () => {
    let allUrl;
    if (name === "Popular Games") {
      allUrl = popularGamesURL().replace("page_size=10", "page_size=20");
    }
    if (name === "Upcoming Games") {
      allUrl = upcomingGamesURL();
    }
    if (name === "New Games") {
      allUrl = newGamesURL();
    }
    const { data } = await axios.get(allUrl);
    setViewAllData(data);
  };
  useEffect(() => {
    fetchAllData();
    return () => {
      setViewAllData(undefined);
    };
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#151515" }}
    >
      <View style={{ margin: 20 }}>
        {!viewAllData && <ActivityIndicator size="large" color="#a3faff" />}
        {viewAllData &&
          viewAllData.results.map((game) => (
            <CardLarge game={game} navigation={navigation} key={game.id} />
          ))}
      </View>
    </ScrollView>
  );
};

export default ViewAll;
