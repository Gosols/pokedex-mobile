import React from "react";

import { Content, Card, CardItem, Body, Left, Text } from "native-base";
import { Linking } from "react-native";

export default function AboutPage() {
  return (
    <Content>
      <Card>
        <CardItem header>
          <Text style={{ fontWeight: "bold" }}>Creator Info</Text>
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
            <Text>Student/Software Developer at Kraftvaerk</Text>
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
          <Text>
            This project was part of a Mobile Development course provided by
            Haaga-Helia UAS. The idea for this app was to mimic the Pokédex
            found in the Pokémon games. This particular "Pokédex" contains
            Pokémon{" "}
            <Text style={{ fontWeight: "bold" }}> from Gen I to Gen III</Text>
            {"\n\n"}
            However{" "}
            <Text style={{ fontWeight: "bold" }}>
              it didn't turn out as planned.{" "}
            </Text>{" "}
            the end goal was to have unique cries for each Pokémon that the user
            could play back. Also notifications for the app was initially
            planned to be implemented, but aren't present. Also now that I think
            about it, a database implementation would've been great for this
            app, MongoDB for example. Other than that the app turned out as
            planned.
            {"\n\n"}
            The reason for these missing features is the fact that{" "}
            <Text style={{ fontWeight: "bold" }}>
              I landed a position as a Software Developer at Kraftvaerk
            </Text>
            , so most of my focus has been on actual real-life customer
            projects.
            {"\n\n"}I did, however, learn a ton during this course. I had next
            to no experience in mobile development prior to this course. Thank
            you <Text style={{ fontWeight: "bold" }}>Juha Hinkula</Text> for
            this excellent, well organized Mobile Development course.
          </Text>
        </CardItem>
      </Card>
      <Card>
        <CardItem header>
          <Text style={{ fontWeight: "bold" }}>Project Details</Text>
        </CardItem>
        <CardItem>
          <Text>
            The main technologies used for this project are{" "}
            <Text style={{ fontWeight: "bold" }}>React Native</Text> and
            <Text style={{ fontWeight: "bold" }}> Expo</Text>.{" "}
            <Text style={{ fontWeight: "bold" }}>Native Base </Text> was
            slightly used here and there, especially here in the "About" page.
            For the navigation,{" "}
            <Text style={{ fontWeight: "bold" }}>Stack Navigation</Text> from
            React Navigation was used. {"\n\n"}
            The duration of this project has been a few months. Note that during
            this period, other ongoing projects have been present as well,
            taking time from this one.
          </Text>
        </CardItem>
      </Card>
    </Content>
  );
}
