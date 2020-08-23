//import { StatusBar } from "expo-status-bar";
import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Main from "./src/Main";

export default function App() {
  const [isReady, setReady] = React.useState(false);

  componentDidMount = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    setReady(true);
  };

  React.useEffect(() => {
    componentDidMount();
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }
  return <Main />;
}
