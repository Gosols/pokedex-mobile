import React, { useState, useEffect } from "react";
import { capitalize } from "./Capitalization";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ToastAndroid,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PokemonListItem from "./PokemonListItem";
import { Button, Icon } from "native-base";

export default function PokemonList({ navigation }) {
  const [listOfPokemon, setList] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [favorites, setFavorites] = useState([]);

  //variables used for limiting the rendering to Gen I - III
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

  //function used for rendering more pokemon once close to the end of the list
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

  // add pokemon object to favorites -list
  const addToFavorites = (pokemonObj) => {
    const list = favorites;
    list.push(pokemonObj);
    setFavorites(list);
  };

  // function for showing the toast message
  const showToast = (isFav, pokemon) => {
    if (isFav) {
      ToastAndroid.show(
        `${capitalize(pokemon.name)} removed from favorites`,
        ToastAndroid.SHORT
      );
    } else {
      ToastAndroid.show(
        `${capitalize(pokemon.name)} added to favorites`,
        ToastAndroid.SHORT
      );
    }
  };
  // favorite button used in the list
  const FavoriteButton = ({ pokemon, isFav, setFavorite }) => {
    // if in favorites...
    if (isFav) {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            setFavorite(false);
            showToast(isFav, pokemon);
          }}
        >
          <AntDesign
            color="#f5c842"
            name="star"
            size={25}
            style={{ marginHorizontal: 10 }}
          />
        </TouchableWithoutFeedback>
      );
      // if not...
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            addToFavorites(pokemon);
            setFavorite(true);
            showToast(isFav, pokemon);
          }}
        >
          <AntDesign
            color="#f5c842"
            name="staro"
            size={25}
            style={{ marginHorizontal: 10 }}
          />
        </TouchableWithoutFeedback>
      );
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
      <PokemonListItem url={item.url} Favorite={FavoriteButton} />
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
