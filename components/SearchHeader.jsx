import { View, TextInput } from "react-native";
import React, { useRef, useEffect } from "react";
import useAppContext from "../context/useAppContext";

const SearchHeader = () => {
  const { searchInput, setSearchInput } = useAppContext();
  // const inputRef = useRef();

  //doesn't work !!
  // useEffect(() => {
  //   console.log('first')
  //   if (inputRef) {
  //     setTimeout(() => {
  //       inputRef.focus();
  //     }, 100);
  //   console.log(inputRef)  
  //   }
  // }, []);

  return (
    <View>
      <TextInput
        // ref={inputRef}
        placeholder="Search"
        autoFocus={true}
        onChangeText={setSearchInput}
        value={searchInput}
        placeholderTextColor={"#fff"}
        style={{
          fontSize: 18,
          borderColor: "grey",
          color: "#fff",
          width: 200,
          borderBottomWidth: 1,
        }}
      />
    </View>
  );
};

export default SearchHeader;
