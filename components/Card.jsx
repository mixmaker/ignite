import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { mediaResizer } from "../api";
// import FastImage from 'react-native-fast-image'

const Card = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: mediaResizer(item.background_image, 640) }}
        style={styles.image}
      />
      <Text
        numberOfLines={2}
        style={{ marginTop: 5, marginLeft: 5, color: "#fff" }}
      >
        {item.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#202020",
    borderRadius: 10,
    overflow: "hidden",
    paddingBottom: 10,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    width: 210,
    height: 170,
  },
  image: { width: 210, height: 120 },
});
export default Card;
