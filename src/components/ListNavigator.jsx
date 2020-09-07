import React from "react";
import { Header, Button, Left, Body, Right, Text } from "native-base";
import { StatusBar } from "expo-status-bar";
import { Icon } from "native-base";

export default function ListNavigator({ callback, previous, next }) {
  console.log(previous, next);
  return (
    <Header style={{ backgroundColor: "white", height: 70 }}>
      <Left style={{ flex: 1, marginLeft: 50 }}>
        <Button transparent>
          <Icon
            type="Feather"
            name="arrow-left-circle"
            style={{
              color: "black",
            }}
          ></Icon>
        </Button>
      </Left>
      <Body
        style={{
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text style={{ color: "black" }}>1-151</Text>
      </Body>

      <Right style={{ flex: 1, marginRight: 50 }}>
        <Button
          transparent
          onPress={() => {
            if (next != undefined || next != null) {
              callback(next);
            } else {
              console.log("null tai undefined");
            }
          }}
        >
          <Icon
            type="Feather"
            name="arrow-right-circle"
            style={{ color: "black" }}
          ></Icon>
        </Button>
      </Right>
    </Header>
  );
}
