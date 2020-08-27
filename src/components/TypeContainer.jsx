import React from "react";
import { Text } from "native-base";

export default function TypeContainer({ typelist }) {
  const types = typelist;

  const typeColors = {
    grass: "#51b32b",
    poison: "#975ab0",
    fire: "#ff9633",
    flying: "#ccc5a1",
    normal: "#bdbcbb",
    water: "#2365ba",
    bug: "#bfbf58",
    electric: "#f0e346",
    ground: "#bd9c6c",
    fairy: "#e3a6da",
    fighting: "#b53333",
    psychic: "#f25ab0",
    rock: "#8c7338",
    steel: "#cebeed",
    ghost: "#8c659c",
    ice: "#74cadb",
    dragon: "#7f5ad6",
    dark: "#635c4f",
    "???": "#6d948b",
  };

  return (
    <>
      {types.map((type, i) => {
        return (
          <Text
            style={{
              backgroundColor: typeColors[type.type.name],
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
