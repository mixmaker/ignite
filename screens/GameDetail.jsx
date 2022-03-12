import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { gameDetailsURL, gameScreenshotURL, mediaResizer } from "../api";
import axios from "axios";
// import FastImage from 'react-native-fast-image'
import useAppContext from "../context/useAppContext";

const GameDetail = ({ route }) => {
  const { gameDetail, setGameDetail, screenshots, setScreenshots } =
    useAppContext();
  const { id } = route.params;
  const fetchGameDetail = async () => {
    const gameDetailUrl = gameDetailsURL(id);
    const ssUrl = gameScreenshotURL(id);
    try {
      const detailData = await axios.get(gameDetailUrl);
      setGameDetail(detailData.data);
      const ssData = await axios.get(ssUrl);
      setScreenshots(ssData.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGameDetail();
    return () => {
      setGameDetail(undefined);
      setScreenshots(undefined);
    };
  }, [setGameDetail, setScreenshots]);
  if (gameDetail) {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "#151515" }}
      >
        <View style={styles.container}>
          <Text style={styles.mainHeading}>{gameDetail.name}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.released}>
              Released on {gameDetail.released ? gameDetail.released : "TBA"}
            </Text>
            <Text style={{ color: "#272727" }}>
              Rating: {gameDetail.rating}/5
            </Text>
          </View>
          <Image
            source={{ uri: mediaResizer(gameDetail.background_image, 640) }}
            style={{ ...styles.coverImg, height: 200 }}
          />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.items}>
              <Text style={styles.subHeading}>Platforms </Text>
              <Text style={{ color: "#fff" }}>
                {gameDetail.platforms
                  .map((elem) => elem.platform.name)
                  .join(", ")}
              </Text>
            </View>
            <View style={styles.items}>
              <Text style={styles.subHeading}>Developer</Text>
              {gameDetail.developers.length === 0 ? (
                <Text style={{ color: "#fff" }}>NA</Text>
              ) : (
                gameDetail.developers.map((element) => (
                  <Text key={element.id} style={{ color: "#fff" }}>
                    {element.name}
                  </Text>
                ))
              )}
            </View>
            <View style={styles.items}>
              <Text style={styles.subHeading}>Publisher</Text>
              {gameDetail.publishers.length === 0 ? (
                <Text style={{ color: "#fff" }}>NA</Text>
              ) : (
                gameDetail.publishers.map((element) => (
                  <Text key={element.id} style={{ color: "#fff" }}>
                    {element.name}
                  </Text>
                ))
              )}
            </View>
            <View style={styles.items}>
              <Text style={styles.subHeading}>Website</Text>
              <Text style={{ color: "#fff" }}>
                {gameDetail.website ? gameDetail.website : "NA"}
              </Text>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ ...styles.subHeading, fontSize: 20, marginTop: 10 }}>
              About:{" "}
            </Text>
            <Text style={styles.description}>{gameDetail.description_raw}</Text>
          </View>
          <View style={styles.ssContainer}>
            <Text style={{ ...styles.subHeading, fontSize: 20 }}>
              Screenshots:{" "}
            </Text>
            {!screenshots && <ActivityIndicator size="large" color="#a3faff" />}
            {screenshots && screenshots.results.length === 0 && (
              <Text style={{ color: "#fff" }}>No screenshots available :(</Text>
            )}
            {screenshots &&
              screenshots.results.map((ss) => (
                <Image
                  key={ss.id}
                  source={{ uri: mediaResizer(ss.image, 640) }}
                  style={{ height: 200, marginBottom: 5 }}
                />
              ))}
          </View>
        </View>
      </ScrollView>
    );
  } else if (!gameDetail) {
    return (
      <View style={{ flex: 1, backgroundColor: "#151515" }}>
        <ActivityIndicator
          size="large"
          color="#a3faff"
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: { margin: 20 },
  mainHeading: {
    fontSize: 24,
    color: "#fff",
  },
  released: {
    marginBottom: 10,
    color: "grey",
  },
  coverImg: {
    marginBottom: 5,
  },
  description: {
    color: "#fff",
  },
  ssContainer: {
    marginTop: 10,
  },
  subHeading: {
    color: "grey",
  },
  items: {
    margin: 5,
    width: "45%",
  },
});
export default GameDetail;
