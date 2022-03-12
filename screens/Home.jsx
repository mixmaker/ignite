import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import { newGamesURL, popularGamesURL, upcomingGamesURL } from "../api";
import useAppContext from "../context/useAppContext";
import { EvilIcons } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const { popular, setPopular, upcoming, setUpcoming, newGames, setNewGames } =
    useAppContext();

  const fetchHomedata = async () => {
    const popularUrl = popularGamesURL();
    const upcomingUrl = upcomingGamesURL();
    const newUrl = newGamesURL();
    try {
      const popularData = await axios.get(popularUrl);
      setPopular(popularData.data);
      const upcomingData = await axios.get(upcomingUrl);
      setUpcoming(upcomingData.data);
      const newGamesData = await axios.get(newUrl);
      setNewGames(newGamesData.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchHomedata();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.categoryWrapper}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...styles.subHeading, color: "#fff" }}>
              Popular Games
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ViewAll", { name: "Popular Games" })
              }
            >
              <Text
                style={{
                  marginBottom: 10,
                  color: "#fff",
                  // fontSize:20
                }}
              >
                see all{" "}
                <EvilIcons name="chevron-right" size={20} color="#fff" />
              </Text>
            </TouchableOpacity>
          </View>
          {!popular && <ActivityIndicator size="large" color="#a3faff" />}
          {popular && (
            <FlatList
              horizontal
              data={popular.results}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate("GameDetail", {
                      name: item.name,
                      id: item.id,
                    })
                  }
                >
                  <View>
                    <Card item={item} />
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          )}
        </View>
        <View style={styles.categoryWrapper}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...styles.subHeading, color: "#fff" }}>
              Upcoming Games
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ViewAll", { name: "Upcoming Games" })
              }
            >
              <Text style={{ marginBottom: 10, color: "#fff" }}>
                see all{" "}
                <EvilIcons name="chevron-right" size={20} color="#fff" />
              </Text>
            </TouchableOpacity>
          </View>
          {!upcoming && <ActivityIndicator size="large" color="#a3faff" />}
          {upcoming && (
            <FlatList
              horizontal
              data={upcoming.results}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate("GameDetail", {
                      name: item.name,
                      id: item.id,
                    })
                  }
                >
                  <View>
                    <Card item={item} />
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          )}
        </View>
        <View style={styles.categoryWrapper}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...styles.subHeading, color: "#fff" }}>
              New Games
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ViewAll", { name: "New Games" })
              }
            >
              <Text style={{ marginBottom: 10, color: "#fff" }}>
                see all{" "}
                <EvilIcons name="chevron-right" size={20} color="#fff" />
              </Text>
            </TouchableOpacity>
          </View>
          {!newGames && <ActivityIndicator size="large" color="#a3faff" />}
          {newGames && (
            <FlatList
              horizontal
              data={newGames.results}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate("GameDetail", {
                      name: item.name,
                      id: item.id,
                    })
                  }
                >
                  <View>
                    <Card item={item} />
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151515",
    flex: 1,
  },
  categoryWrapper: {
    marginHorizontal: 20,
    marginVertical: 20,
    // height: 300,
  },
  mainHeading: {
    fontSize: 30,
    marginLeft: 10,
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 10,
  },
});
export default Home;
