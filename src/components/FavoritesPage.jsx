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
  const renderItem = ({ item }) => {
    console.log(item.url);
    return (
      <TouchableHighlight
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
            margin: 5,
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
}
