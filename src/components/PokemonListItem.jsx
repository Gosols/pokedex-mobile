import React from "react";
import TypeContainer from "./TypeContainer";
import {
  ListItem,
  Body,
  Text,
  Left,
  Right,
  Thumbnail,
  Content,
} from "native-base";

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
          <Text>Waiting for Pokémon data...</Text>
        </Body>
      </ListItem>
    );
  } else {
    return (
      <ListItem>
        <Left>
          <Thumbnail
            square
            source={{ uri: pokemondata.sprites.front_default }}
            style={{
              marginRight: 10,
              backgroundColor: "#ededed",
              borderRadius: 100,
            }}
          />
          <Text style={{ fontWeight: "bold" }}>
            {pokemondata.name.charAt(0).toUpperCase() +
              pokemondata.name.slice(1)}
          </Text>
        </Left>
        <Body
          style={{
            alignItems: "flex-end",
          }}
        >
          <TypeContainer typelist={pokemondata.types} />
        </Body>
        <Right>
          <Text style={{ fontWeight: "bold" }}>#{pokemondata.id}</Text>
        </Right>
      </ListItem>
    );
  }
}
