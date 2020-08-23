import React from "react";
import { View, Text } from "react-native";

export default function PokemonList() {
  const [listOfPokemon, setList] = React.useState([]);

  const getList = async () => {
    await fetch("https://pokeapi.co/api/v2/pokemon?limit=1048")
      .then((res) => res.json())
      .then((data) => setList(data));

    console.log(listOfPokemon);
  };

  React.useEffect(() => {
    getList();
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
}
