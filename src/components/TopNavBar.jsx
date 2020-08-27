import React from "react";
import { Header, Button, Text, Right, Body, Title } from "native-base";

export default function TopNavBar() {
  return (
    <Header>
      <Body>
        <Title>Placeholder</Title>
      </Body>
      <Right>
        <Button>
          <Text>Pokémon</Text>
        </Button>
        <Button>
          <Text>About</Text>
        </Button>
      </Right>
    </Header>
  );
}
