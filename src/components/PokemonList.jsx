import React from "react";
import { View, Text } from "react-native";
import PokemonListItem from "./PokemonListItem";
import { List, Content } from "native-base";

export default function PokemonList() {
  const [listOfPokemon, setList] = React.useState([]);
  const [isLoaded, setLoaded] = React.useState(false);

  const getList = async () => {
    await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => setList(data.results));

    setLoaded(true);
  };

  React.useEffect(() => {
    getList();
  }, []);

  if (!isLoaded) {
    return (
      <View>
        <Text>Loading the list of Pokémon...</Text>
      </View>
    );
  }
  return (
    <Content>
      <List>
        {listOfPokemon.map((pokemon, i) => {
          if (!pokemon.name.includes("-")) {
            return <PokemonListItem key={i} url={pokemon.url} />;
          }
        })}
      </List>
    </Content>
  );
}
