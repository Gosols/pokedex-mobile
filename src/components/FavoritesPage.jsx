import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { Thumbnail } from "native-base";
import { capitalize } from "./Capitalization";

export default function FavoritesPage({
  route,
  favorites = route.params.favorites,
  navigation,
}) {
  // an individual list item
  const renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        style={{ borderRadius: 10, margin: 5 }}
        underlayColor="#ffc3c2"
        onPress={() => {
          navigation.navigate("Pokémon Details", {
            url: `https://pokeapi.co/api/v2/pokemon/${item.name}`,
          });
        }}
      >
        <View
          style={{
            alignContent: "center",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Thumbnail
            square
            source={{
              uri: item.sprites.other["official-artwork"].front_default,
            }}
            style={{ width: 120, height: 120 }}
          />
          <Text style={{ textAlign: "center" }}>{capitalize(item.name)}</Text>
        </View>
      </TouchableHighlight>
    );
  };
  // if there are no favorites, do something else.
  const RenderConditions = () => {
    if (favorites.length < 1) {
      return (
        <View style={{}}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              marginTop: 10,
            }}
          >
            You have no favorites.
          </Text>
        </View>
      );
    }
    return (
      <SafeAreaView>
        <View style={{ height: 1, backgroundColor: "black" }}></View>
        <View style={{ alignItems: "center" }}>
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            numColumns={3}
          />
        </View>
      </SafeAreaView>
    );
  };

  return <RenderConditions />;
}
