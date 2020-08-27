import React from "react";
import { Text } from "native-base";

export default function TypeContainer({ typelist }) {
  const types = typelist;

  const defineColor = (type) => {
    switch (type) {
      case "grass":
        return "#51b32b";

      case "poison":
        return "#779141";

      case "fire":
        return "#ff9633";

      case "flying":
        return "#ccc5a1";

      case "normal":
        return "#bdbcbb";

      case "water":
        return "#2365ba";

      case "bug":
        return "#bfbf58";

      case "electric":
        return "#f0e346";

      case "ground":
        return "#bd9c6c";

      case "fairy":
        return "#e3a6da";

      case "fighting":
        return "#b53333";

      case "psychic":
        return "#f25ab0";

      case "rock":
        return "#8c7338";

      case "steel":
        return "#cebeed";

      default:
        return "red";
    }
  };

  return (
    <>
      {types.map((type, i) => {
        return (
          <Text
            style={{
              backgroundColor: defineColor(type.type.name),
              paddingHorizontal: 10,
              paddingVertical: 1,
              borderRadius: 100,
              marginBottom: 2,
              color: "white",
              width: 70,
              textAlign: "center",
              fontSize: 12,
            }}
            key={i}
          >
            {type.type.name}
          </Text>
        );
      })}
    </>
  );
}
