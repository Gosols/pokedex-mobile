import React from "react";
import { Image } from "react-native";
import { ListItem, Body, Text, Left, Right, Thumbnail } from "native-base";

export default function PokemonListItem({ url }) {
  const [pokemondata, setData] = React.useState({});
  const [dataReady, setReady] = React.useState(false);

  const getData = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));

    setReady(true);
  };

  React.useEffect(() => {
    getData();
  }, []);

  if (!dataReady) {
    return (
      <ListItem>
        <Body>
          <Text>Loading pokemon</Text>
        </Body>
      </ListItem>
    );
  } else {
    return (
      <ListItem>
        <Left>
          <Thumbnail source={{ uri: pokemondata.sprites.front_default }} />
        </Left>
        <Body>
          <Text>{pokemondata.name}</Text>
        </Body>
        <Right>
          <Text>{pokemondata.id}</Text>
        </Right>
      </ListItem>
    );
  }
}
