import React from "react";
import { View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function SpeciesPage({ route, url = route.params.url }) {
  const [PData, setData] = React.useState([]);
  const [isReady, setReady] = React.useState(false);

  const getData = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));

    setReady(true);
  };

  React.useEffect(() => {
    getData();
  }, []);

  if (!isReady) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 170,
        }}
      >
        <LinearGradient colors={["lightgrey", "white"]}>
          <Image
            style={{
              width: 130,
              height: 130,
              borderWidth: 2,
              borderRadius: 100,
              borderColor: "black",
            }}
            source={{ uri: PData.sprites.front_default }}
          />
        </LinearGradient>
      </View>
      <View>
        <Text>Data for</Text>
      </View>
    </View>
  );
}
