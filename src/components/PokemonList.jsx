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

  let isMounted = true; // boolean for component mounting

  // data fetching...
  const getList = async () => {
    await fetch(`https://pokeapi.co/api/v2/pokemon?limit=386`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          const updated = listOfPokemon.concat(data.results);
          setList(updated);
        }
      });
    setLoaded(true);
  };

  useEffect(() => {
    getList();
    return () => (isMounted = false);
  }, []);

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
            let newList = [];
            console.log(pokemon.name);
            favorites.forEach((poke) => {
              console.log(poke.name);
              if (poke.name == pokemon.name) {
              } else {
                newList.push(poke);
              }
            });
            setFavorites(newList);
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
  // function for stack navigation functionalities
  // basically forms the top banner of the component
  navigation.setOptions({
    headerRight: () => (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Button
          transparent
          onPress={() => {
            navigation.navigate("Favorites", {
              favorites: favorites,
            });
          }}
        >
          <AntDesign color="white" name="star" size={25} />
        </Button>
        <Button
          transparent
          onPress={() => {
            navigation.navigate("About");
          }}
        >
          <Icon type="Feather" name="info" style={{ color: "#fff" }} />
        </Button>
      </View>
    ),
  });

  // individual item for the pokemon list
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

  // list item separator
  const separator = () => <View style={{ height: 5 }}></View>;

  // if component is not loaded yet...
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
        />
      </View>
    </SafeAreaView>
  );
}
