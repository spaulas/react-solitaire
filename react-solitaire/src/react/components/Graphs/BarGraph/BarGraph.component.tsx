import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import React, { useEffect, useState } from "react";

interface BarGraphProps {
  width: number;
  height: number;
}

function BarGraph({ width, height }: BarGraphProps) {
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
    <BarChart
      width={width}
      height={height}
      data={data}
      barCategoryGap={0}
      className="statisticsBarChart"
    >
      <XAxis dataKey="name" />
      <YAxis dataKey="moves" />
      <Tooltip
        cursor={{
          fill: "rgba(0,0,0,0.2)"
        }}
        labelFormatter={(bar: string | number) => (
          <span>{`${label[bar]} ${label[bar] > 1 ? "games" : "game"}`}</span>
        )}
      />
      <Bar dataKey="moves" fill="rgba(255, 255, 255, 0.1)" />
    </BarChart>
  );
}

export default BarGraph;
