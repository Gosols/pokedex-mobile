import React from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import PokemonListItem from "./PokemonListItem";
import { Button, Icon } from "native-base";

export default function PokemonList({ navigation }) {
  const [listOfPokemon, setList] = React.useState([]);
  const [isLoaded, setLoaded] = React.useState(false);
  const [url, setUrl] = React.useState(
    "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0"
  );

  const getList = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setList(data.results);
      });

    setLoaded(true);
  };

  navigation.setOptions({
    headerRight: () => (
      <Button
        transparent
        onPress={() => {
          navigation.navigate("About");
        }}
      >
        <Icon type="Feather" name="info" style={{ color: "#fff" }} />
      </Button>
    ),
  });

  React.useEffect(() => {
    getList();
  }, [url]);

  const renderItem = ({ item }) => (
    <TouchableHighlight
      style={{ borderRadius: 10 }}
      underlayColor="#ffc3c2"
      onPress={() => {
        navigation.navigate("Pokémon Details", {
          url: item.url,
        });
      }}
    >
      <PokemonListItem url={item.url} />
    </TouchableHighlight>
  );

  const separator = () => <View style={{ height: 5 }}></View>;

  if (!isLoaded) {
    return (
      <View>
        <Text>Loading the list of Pokémon...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView>
      <View style={{ alignItems: "center" }}>
        <FlatList
          data={listOfPokemon}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          ItemSeparatorComponent={separator}
        />
      </View>
    </SafeAreaView>
  );
}
