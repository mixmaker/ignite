import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { TouchableOpacity } from "react-native";
import GlobalState from "./context/GlobalState";
import GameDetail from "./screens/GameDetail";
import { AntDesign } from "@expo/vector-icons";
import Search from "./screens/Search";
import SearchHeader from "./components/SearchHeader";
import ViewAll from "./screens/ViewAll";
import { View } from "react-native";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <GlobalState>
      <StatusBar style="light" />
      <View style={{ backgroundColor: "#151515", flex:1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                headerStyle: {
                  backgroundColor: "#1b1c1c",
                },
                headerTintColor: "#fff",
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Search")}
                  >
                    <AntDesign name="search1" size={24} color="#fff" />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="GameDetail"
              component={GameDetail}
              options={({ route }) => ({
                headerStyle: {
                  backgroundColor: "#1b1c1c",
                },
                headerTintColor: "#fff",
                headerTitle: route.params.name,
              })}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{
                headerStyle: {
                  backgroundColor: "#1b1c1c",
                },
                headerTintColor: "#fff",
                headerTitle: () => <SearchHeader />,
              }}
            />
            <Stack.Screen
              name="ViewAll"
              component={ViewAll}
              options={({ route }) => ({
                headerStyle: {
                  backgroundColor: "#1b1c1c",
                },
                headerTintColor: "#fff",
                headerTitle: route.params.name,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </GlobalState>
  );
}
