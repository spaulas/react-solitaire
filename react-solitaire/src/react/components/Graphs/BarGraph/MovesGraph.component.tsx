import React, { useEffect, useState } from "react";
import BarGraph from "./BarGraph.component";

interface MovesGraphProps {
  width: number;
  height: number;
}

function MovesGraph({ width, height }: MovesGraphProps) {
  const [data, setData] = useState<Array<object>>([]);
  const [label, setLabel] = useState<Record<string, number>>({});
  const getData = () => {
    const currentLocal = localStorage.getItem("offlineUser");
    const offlineUser = currentLocal ? JSON.parse(currentLocal) : {};

    const maxMoves = offlineUser?.maxMoves || 0;

    const dataTemp = [];
    let labelTemp = {};
    const movesSlot = Math.ceil(maxMoves / 5);

    for (let i = 0; i < maxMoves; i += movesSlot) {
      const max = i + movesSlot;
      const result = offlineUser?.history?.reduce(
        (acc: number, gameInfo: { moves: number }) => {
          if (gameInfo.moves > i && gameInfo.moves <= max) {
            return acc + 1;
          }
          return acc;
        },
        0
      );

      const barLabel = `]${i}, ${max}]`;

      dataTemp.push({
        name: barLabel,
        moves: result
      });

      labelTemp = { ...labelTemp, [barLabel]: result };
    }

    setData(dataTemp);
    setLabel(labelTemp);
  };
  useEffect(getData, []);

  return (
    <BarGraph
      data={data}
      dataKey="moves"
      label={label}
      width={width}
      height={height}
    />
  );
}

export default MovesGraph;
