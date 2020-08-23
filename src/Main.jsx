import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import Constants from "expo-constants";
import TopNavBar from "./components/TopNavBar";
import PokemonList from "./components/PokemonList";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },
});

export default function Main() {
  return (
    <View>
      <TopNavBar />
      <PokemonList />
    </View>
  );
}
