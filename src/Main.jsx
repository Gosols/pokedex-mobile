import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PokemonList from "./components/PokemonList";
import AboutPage from "./components/About";
import { StatusBar } from "expo-status-bar";
import PokemonListItem from "./components/PokemonListItem";
import SpeciesPage from "./components/SpeciesPage";

//Needed for Routing
const Stack = createStackNavigator();

const headerOptions = {
  headerStyle: {
    backgroundColor: "#FF0000",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

export default function Main() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#FF0000" style="light" />
      <Stack.Navigator
        initialRouteName="Pokémon List"
        screenOptions={headerOptions}
      >
        <Stack.Screen name="Pokémon List" component={PokemonList} />
        <Stack.Screen name="About" component={AboutPage} />
        <Stack.Screen name="ListItem" component={PokemonListItem} />
        <Stack.Screen name="Pokémon Details" component={SpeciesPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
