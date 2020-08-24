import React from "react";
import { Container } from "native-base";
import { View, Platform, StyleSheet } from "react-native";
import Constants from "expo-constants";
import TopNavBar from "./components/TopNavBar";
import PokemonList from "./components/PokemonList";

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
});

export default function Main() {
  return (
    <Container>
      <TopNavBar />
      <PokemonList />
    </Container>
  );
}
