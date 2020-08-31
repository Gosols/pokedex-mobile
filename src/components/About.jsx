import React from "react";

import { Content, Card, CardItem, Body, Left, Right, Text } from "native-base";
import { Linking } from "react-native";

export default function AboutPage() {
  return (
    <Content>
      <Card>
        <CardItem header>
          <Text style={{ fontWeight: "bold" }}>Creator</Text>
        </CardItem>
        <CardItem>
          <Left>
            <Text>Name:</Text>
          </Left>
          <Body>
            <Text>Teemu Kosonen</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Text>Occupation:</Text>
          </Left>
          <Body>
            <Text>Software Development Student</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Text
              style={{ color: "red" }}
              onPress={() => {
                Linking.openURL("https://github.com/gosols");
              }}
            >
              GitHub Profile
            </Text>
          </Left>
          <Body>
            <Text
              style={{ color: "red" }}
              onPress={() => {
                Linking.openURL(
                  "https://www.linkedin.com/in/teemu-kosonen-a5a899195/"
                );
              }}
            >
              LinkedIn Profile
            </Text>
          </Body>
        </CardItem>
      </Card>
      <Card>
        <CardItem header>
          <Text style={{ fontWeight: "bold" }}>App Description</Text>
        </CardItem>
        <CardItem>
          <Text>TYÖN ALLA</Text>
        </CardItem>
      </Card>
    </Content>
  );
}
