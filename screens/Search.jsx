import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect } from "react";
import useAppContext from "../context/useAppContext";
import axios from "axios";
import { searchGameURL } from "../api";
import CardLarge from "../components/CardLarge";

const Search = ({ navigation }) => {
  const { searchInput, setSearchInput, searchedData, setSearchedData } =
    useAppContext();

  const fetchSearchedGames = async () => {
    if (searchInput && searchInput !== "") {
      try {
        const searchUrl = searchGameURL(searchInput);
        const { data } = await axios.get(searchUrl);
        setSearchedData(data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    if (searchInput !== undefined && searchInput !== "") {
      fetchSearchedGames();
    }
    if (searchInput === "") {
      setSearchedData(undefined);
    }
  }, [searchInput]);

  useEffect(() => {
    return () => {
      setSearchInput(undefined);
      setSearchedData(undefined);
    };
  }, []);

  if (searchedData) {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "#151515" }}
      >
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ marginVertical: 10, color: "#a0a0a0" }}>
            Found {searchedData.count} results
          </Text>
          {searchedData.results.map((game) => (
            <CardLarge game={game} navigation={navigation} key={game.id} />
          ))}
        </View>
      </ScrollView>
    );
  } else if (!searchedData && searchInput) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#151515",
          padding: 20,
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#a3faff" />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#151515",
          padding: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>Search for games</Text>
      </View>
    );
  }
};

export default Search;
