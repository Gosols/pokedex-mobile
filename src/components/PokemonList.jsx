import React, { useState, useEffect } from "react";
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
  const [listOfPokemon, setList] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  let limit = 151;
  let offset = 0;

  const [genII, setGenII] = useState(false);
  const [genIII, setGenIII] = useState(false);

  const getList = async () => {
    await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    )
      .then((res) => res.json())
      .then((data) => {
        const updated = listOfPokemon.concat(data.results);
        setList(updated);
      });

    setLoaded(true);
  };

  const loadMore = () => {
    console.log("now limit is " + limit);
    if (!genII) {
      console.log("generating GEN 2");
      offset = 151;
      limit = 100;
      setGenII(true);
      getList();
    } else if (!genIII) {
      console.log("generating GEN 3");
      offset = 251;
      limit = 135;
      setGenIII(true);
      getList();
    } else {
      return;
    }
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

  useEffect(() => {
    getList();
  }, []);

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
      <View style={{ height: 1, backgroundColor: "black" }}></View>
      <View style={{ alignItems: "center" }}>
        <FlatList
          data={listOfPokemon}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          ItemSeparatorComponent={separator}
          onEndReached={loadMore}
          onEndReachedThreshold={0}
        />
      </View>
    </SafeAreaView>
  );
}
