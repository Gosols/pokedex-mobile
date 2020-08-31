import React from "react";
import { Container } from "native-base";
import { View, Platform, StyleSheet } from "react-native";
import Constants from "expo-constants";
import TopNavBar from "./components/TopNavBar";
import PokemonList from "./components/PokemonList";
import AboutPage from "./components/About";

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
});

export default function Main() {
  const [ActiveComponent, setActive] = React.useState("PokémonList");

  const ChangeActiveComponent = (value) => {
    setActive(value);
    console.log(ActiveComponent);
  };

  const CurrentComponent = (name) => {
    if (name.localeCompare("PokémonList") == 0) {
      return <PokemonList />;
    }
    if (name.localeCompare("About") == 0) {
      return <AboutPage />;
    }
  };

  return (
    <Container>
      <TopNavBar callback={ChangeActiveComponent} />
      {CurrentComponent(ActiveComponent)}
    </Container>
  );
}
