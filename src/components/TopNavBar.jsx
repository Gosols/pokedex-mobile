import React from "react";
import { Header, Button, Text, Right, Body, Title } from "native-base";

export default function TopNavBar({ callback }) {
  const [title, setTitle] = React.useState("Pokémon List");
  return (
    <Header>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        <Button
          onPress={() => {
            callback("PokémonList");
            setTitle("Pokémon List");
          }}
        >
          <Text>Pokémon</Text>
        </Button>
        <Button
          onPress={() => {
            callback("About");
            setTitle("About this App");
          }}
        >
          <Text>About</Text>
        </Button>
      </Right>
    </Header>
  );
}
