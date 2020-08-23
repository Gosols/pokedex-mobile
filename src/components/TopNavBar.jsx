import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Button,
  Text,
  Right,
  Body,
  Title,
} from "native-base";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    height: 30,
  },
});

export default function TopNavBar() {
  return (
    <Container>
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
    </Container>
  );
}
