import React from "react";
import TypeContainer from "./TypeContainer";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { Thumbnail } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

const styles = StyleSheet.create({
  text: {
    color: "#333333",
    margin: "auto",
  },
  thumbnail: {
    marginRight: 10,
  },
  types: {
    alignItems: "flex-end",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    width: 400,
  },
});

export default function PokemonListItem({ url, navigation, Favorite }) {
  const [pokemondata, setData] = React.useState({});
  const [dataReady, setReady] = React.useState(false);
  const [isFavorite, setFavorite] = React.useState(false);

  const getData = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));

    setReady(true);
  };

  const favoriteStatus = (bool) => {
    setFavorite(bool);
  };

  React.useEffect(() => {
    getData();
  }, []);

  if (!dataReady) {
    return (
      <View style={styles.container}>
        <View
          style={{
            marginLeft: 10,

            flex: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Thumbnail square style={styles.thumbnail} />
          <Text style={styles.text}>Loading Pokémon...</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View
          style={{
            marginLeft: 10,

            flex: 1.5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Thumbnail
            square
            source={{ uri: pokemondata.sprites.front_default }}
            style={styles.thumbnail}
          />
          <Text style={styles.text}>
            {pokemondata.species.name.charAt(0).toUpperCase() +
              pokemondata.species.name.slice(1)}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TypeContainer typelist={pokemondata.types} />
        </View>
        <View
          style={{
            flex: 0.6,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={styles.text}>#{pokemondata.id}</Text>
          <Favorite
            pokemon={pokemondata}
            isFav={isFavorite}
            setFavorite={favoriteStatus}
          />
        </View>
      </View>
    );
  }
}
