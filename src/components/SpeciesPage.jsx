import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import TypeContainer from "./TypeContainer";

const styles = StyleSheet.create({
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 20,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 1,
    borderColor: "black",
  },
  name: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 20,
  },
  container: {
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 2.5,
    padding: 5,
    height: 160,
  },
  stats_container: {
    borderWidth: 1,
    borderRadius: 10,
    flex: 0.7,
    marginVertical: 5,
    marginHorizontal: 2.5,
    padding: 5,
    height: 160,
  },
  header: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 7,
    backgroundColor: "red",
    color: "white",
    borderRadius: 10,
    textAlign: "center",
  },
});

export default function SpeciesPage({ route, url = route.params.url }) {
  // data of a single Pokémon stored
  const [PData, setData] = useState([]);
  const [isReady, setReady] = useState(false);
  const [speciesData, setSpecies] = useState([]);

  const getData = async () => {
    let species = "";

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        species = data.species.url;
      });

    await fetch(species)
      .then((res) => res.json())
      .then((data) => {
        setSpecies(data);
      });

    setReady(true);
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderItem = ({ item }) => {
    return <Text style={{ fontSize: 14 }}>{capitalize(item.move.name)}</Text>;
  };

  React.useEffect(() => {
    getData();
  }, []);

  if (!isReady) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{}}>
      <View style={{ height: 1, backgroundColor: "black" }}></View>
      <View style={styles.topContainer}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image
            style={styles.image}
            source={{ uri: PData.sprites.front_default }}
          />
        </View>
        <Text style={styles.name}>{capitalize(PData.name)}</Text>
        <TypeContainer typelist={PData.types} />
        <View style={{ height: 10 }}></View>
      </View>
      <View style={{ marginHorizontal: 5 }}>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={styles.stats_container}>
              <Text style={styles.header}>Base Stats</Text>
              <View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={{ flex: 1 }}>HP:</Text>
                  <Text style={{ flex: 1 }}>{PData.stats[0].base_stat}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={{ flex: 1 }}>Attack:</Text>
                  <Text style={{ flex: 1 }}>{PData.stats[1].base_stat}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={{ flex: 1 }}>Defense:</Text>
                  <Text style={{ flex: 1 }}>{PData.stats[2].base_stat}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={{ flex: 1 }}>Speed:</Text>
                  <Text style={{ flex: 1 }}>{PData.stats[5].base_stat}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={{ flex: 1 }}>Weight:</Text>
                  <Text style={{ flex: 1 }}>{PData.weight} kg</Text>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.header}>Abilities</Text>
                  {PData.abilities.map((a, i) => {
                    return <Text key={i}>{capitalize(a.ability.name)}</Text>;
                  })}
                </View>
                <View
                  style={{
                    width: 5,
                  }}
                ></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.header}>Moves ⇅</Text>
                  <FlatList
                    style={{ height: 120 }}
                    keyExtractor={(item) => item.move.name}
                    data={PData.moves}
                    renderItem={renderItem}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text>LUL</Text>
        </View>
      </View>
    </View>
  );
}
