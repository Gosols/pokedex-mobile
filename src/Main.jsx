import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import Constants from "expo-constants";
import TopNavBar from "./components/TopNavBar";
import PokemonList from "./components/PokemonList";

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
  },
});

export default function Main() {
  return (
    <View style={styles.container}>
      <TopNavBar />
      <PokemonList />
    </View>
  );
}
