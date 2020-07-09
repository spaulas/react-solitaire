import React, { useEffect, useState } from "react";
import BarGraph from "./BarGraph.component";

interface TimesGraphProps {
  width: number;
  height: number;
}

function TimeGraph({ width, height }: TimesGraphProps) {
  const [data, setData] = useState<Array<object>>([]);
  const [label, setLabel] = useState<Record<string, number>>({});

  const getData = () => {
    const currentLocal = localStorage.getItem("offlineUser");
    const offlineUser = currentLocal ? JSON.parse(currentLocal) : {};

    const maxTime = offlineUser?.maxTime || 0;

    const dataTemp = [];
    let labelTemp = {};
    const timeSlot = Math.ceil(maxTime / 5);

    for (let i = 0; i < maxTime; i += timeSlot) {
      const max = i + timeSlot;
      const result = offlineUser?.history?.reduce(
        (acc: number, gameInfo: { seconds: number }) => {
          if (gameInfo.seconds > i && gameInfo.seconds <= max) {
            return acc + 1;
          }
          return acc;
        },
        0
      );

      const barLabel = `]${i}, ${max}]`;

      dataTemp.push({
        name: barLabel,
        time: result
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
      dataKey="time"
      label={label}
      width={width}
      height={height}
    />
  );
}

export default TimeGraph;
