import React from "react";
import TypeContainer from "./TypeContainer";
import { StyleSheet, View, Text } from "react-native";
import { Thumbnail, Spinner } from "native-base";

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

export default function PokemonListItem({ url, Favorite }) {
  const [pokemondata, setData] = React.useState({});
  const [dataReady, setReady] = React.useState(false);
  const [isFavorite, setFavorite] = React.useState(false);
  let isMounted;

  const favoriteStatus = (bool) => {
    setFavorite(bool);
  };

  const getData = async (abortCtrl) => {
    await fetch(url, { signal: abortCtrl.signal })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    setReady(true);
  };

  React.useEffect(() => {
    const abortCtrl = new AbortController();
    getData(abortCtrl);
  }, [dataReady]);

  if (!dataReady) {
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
          <Spinner color="red" style={{ height: 56 }} />
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
            source={{
              uri: pokemondata.sprites.other["official-artwork"].front_default,
            }}
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
            setFavorite={setFavorite}
          />
        </View>
      </View>
    );
  }
}
