import React, { useEffect, useState } from "react";
import { capitalize } from "../Capitalization";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import TypeContainer from "../TypeContainer";
import Modal from "react-native-modal";
import { Spinner } from "native-base";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

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
  const [isModalActive, setModal] = useState(false);

  // data fetching function
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

  useEffect(() => {
    getData();
  }, []);

  // list item for moves
  const renderItem = ({ item }) => {
    return <Text style={{ fontSize: 14 }}>{capitalize(item.move.name)}</Text>;
  };
  // list item for descriptions.
  const description = ({ item }) => {
    // only render english descriptions
    if (item.language.name == "en") {
      return (
        <View>
          <Text>{item.flavor_text}</Text>
          <View
            style={{ marginVertical: 10, height: 1, backgroundColor: "black" }}
          ></View>
        </View>
      );
    } else {
      return null;
    }
  };
  // checks if a pokemon is legendary or mythical
  const LegendaryOrMythical = () => {
    if (speciesData.is_legendary) {
      return (
        <Text style={{ fontSize: 10, color: "#bf8124", marginTop: -7 }}>
          LEGENDARY
        </Text>
      );
    }
    if (speciesData.is_mythical) {
      return (
        <Text style={{ fontSize: 10, color: "#bf2493", marginTop: -7 }}>
          MYTHICAL
        </Text>
      );
    }

    return <View></View>;
  };

  // individual page components in their own respective consts
  // ---------------------------------------------------------
  const TopContainer = () => {
    return (
      <View style={styles.topContainer}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setModal(true);
            }}
          >
            <Image
              style={styles.image}
              source={{
                uri: PData.sprites.other["official-artwork"].front_default,
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.name}>{capitalize(PData.name)}</Text>
        <LegendaryOrMythical />
        <View style={{ height: 10 }}></View>
        <TypeContainer typelist={PData.types} />
        <View style={{ height: 10 }}></View>
      </View>
    );
  };

  const StatsContainer = () => {
    return (
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
    );
  };

  const AbilitiesAndMoves = () => {
    return (
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
    );
  };
  // component for zooming the image of a pokemon
  const ModalComponent = () => {
    return (
      <Modal
        isVisible={isModalActive}
        onBackdropPress={() => {
          setModal(false);
        }}
      >
        <View style={{ alignSelf: "center" }}>
          <Image
            style={{ width: 260, height: 260 }}
            source={{
              uri: PData.sprites.other["official-artwork"].front_default,
            }}
          />
        </View>
      </Modal>
    );
  };

  const DescCollection = () => {
    return (
      <View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 5,
            marginHorizontal: 2,
          }}
        >
          <Text style={styles.header}>Collection of Descriptions ⇅</Text>
          <FlatList
            style={{ height: 110 }}
            data={speciesData.flavor_text_entries}
            renderItem={description}
            keyExtractor={(item, i) => i.toString()}
          />
        </View>
      </View>
    );
  };

  const SpritesCollection = () => {
    const sprites = [
      PData.sprites.versions["generation-i"]["red-blue"].front_default,
      PData.sprites.versions["generation-i"]["yellow"].front_default,
      PData.sprites.versions["generation-ii"]["crystal"].front_default,
      PData.sprites.versions["generation-ii"]["gold"].front_default,
      PData.sprites.versions["generation-ii"]["silver"].front_default,
      PData.sprites.versions["generation-iii"]["emerald"].front_default,
      PData.sprites.versions["generation-iii"]["firered-leafgreen"]
        .front_default,
      PData.sprites.versions["generation-iii"]["ruby-sapphire"].front_default,
      PData.sprites.versions["generation-iv"]["diamond-pearl"].front_default,
      PData.sprites.versions["generation-iv"]["heartgold-soulsilver"]
        .front_default,
      PData.sprites.versions["generation-iv"]["platinum"].front_default,
      PData.sprites.versions["generation-v"]["black-white"].front_default,
      PData.sprites.versions["generation-v"]["black-white"].front_default,
      PData.sprites.versions["generation-vii"]["icons"].front_default,
      PData.sprites.versions["generation-viii"]["icons"].front_default,
    ];
    return (
      <View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 5,
            marginHorizontal: 2,
            marginTop: 5,
          }}
        >
          <Text style={styles.header}>Sprites ⇆</Text>
          <FlatList
            style={{ height: 150 }}
            data={sprites}
            renderItem={({ item }) => {
              if (item == null) {
                return;
              }
              return (
                <Image
                  source={{ uri: item }}
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                />
              );
            }}
            keyExtractor={(item, i) => i.toString()}
            horizontal={true}
          />
        </View>
      </View>
    );
  };
  // if page is not finished loading...
  if (!isReady) {
    return (
      <View style={{ margin: "auto" }}>
        <Spinner color="red" size="large" />
        <Text style={{ textAlign: "center" }}>Loading Pokémon Data...</Text>
      </View>
    );
  }

  return (
    <View>
      <ModalComponent />
      <View style={{ height: 1, backgroundColor: "black" }}></View>
      <TopContainer />
      <View style={{ marginHorizontal: 5 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <StatsContainer />
          <AbilitiesAndMoves />
        </View>
        <DescCollection />
        <SpritesCollection />
      </View>
    </View>
  );
}
