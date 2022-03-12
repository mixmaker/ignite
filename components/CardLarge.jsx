import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { mediaResizer } from "../api";
// import FastImage from 'react-native-fast-image'

const CardLarge = ({ navigation, game }) => {
  const getPlatform = (platform) => {
    switch (platform) {
      case "PC":
        return "microsoft-windows";
      case "Xbox One":
        return "microsoft-xbox";
      case "Xbox 360":
        return "microsoft-xbox";
      case "Xbox Series S/X":
        return "microsoft-xbox";
      case "PlayStation 5":
        return "sony-playstation";
      case "PlayStation 4":
        return "sony-playstation";
      case "iOS":
        return "apple-ios";
      case "Android":
        return "android";
      case "Nintendo Switch":
        return "nintendo-switch";
      default:
        return;
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("GameDetail", {
          name: game.name,
          id: game.id,
        })
      }
    >
      <View
        style={{
          backgroundColor: "#202020",
          marginBottom: 20,
          paddingBottom: 10,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: mediaResizer(game.background_image, 640) }}
          style={{ height: 200 }}
        />
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {game.platforms &&
              game.platforms.map((platform) => (
                <MaterialCommunityIcons
                  key={platform.platform.id}
                  name={getPlatform(platform.platform.name)}
                  size={20}
                  color="#fff"
                  style={{ marginHorizontal: 2 }}
                />
              ))}
          </View>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="star"
              size={20}
              color="#fff"
              style={{ marginRight: 1 }}
            />
            <Text style={{ color: "#fff" }}>{game.rating}</Text>
          </View>
        </View>
        <Text style={{ marginLeft: 10, fontSize: 23, color: "#fff" }}>
          {game.name}
        </Text>
        <Text
          style={{
            marginLeft: 10,
            color: "#a1a1a1",
            flexDirection: "row",
          }}
        >
          Release date:
          <Text style={{ color: "#fff" }}>
            {" "}
            {new Date(game.released).toDateString()}
          </Text>
        </Text>
        <View style={{ marginLeft: 10, flexDirection: "row" }}>
          <Text style={{ color: "#a1a1a1" }} numberOfLines={2}>
            Genres:
          </Text>
          <Text style={{ color: "#fff" }} numberOfLines={2}>
            {" "}
            {game.genres.map((elem) => elem.name).join(", ")}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CardLarge;
