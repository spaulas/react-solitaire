import BarGraph from "./BarGraph.component";
import React from "react";
import { RootReducerState } from "../../../../global";
import { useSelector } from "react-redux";

interface TimesGraphProps {
  width: number;
  height: number;
}

function TimeGraph({ width, height }: TimesGraphProps) {
  const {
    graphs: {
      time: { data, label }
    }
  } = useSelector(({ User }: RootReducerState) => ({
    graphs: User.graphs
  }));

  return (
    <BarGraph
      data={data}
      dataKey="seconds"
      label={label}
      width={width}
      height={height}
    />
  );
}

export default TimeGraph;
