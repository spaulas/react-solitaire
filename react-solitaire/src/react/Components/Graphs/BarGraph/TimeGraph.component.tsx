import BarGraph from "./BarGraph.component";
import React from "react";
import { RootReducerState } from "../../../../global";
import { useSelector } from "react-redux";

interface TimesGraphProps {
  width: number;
  height: number;
  className?: string;
}

function TimeGraph({ width, height, className }: TimesGraphProps) {
  const {
    graphs: {
      time: { data, label }
    }
  } = useSelector(({ User }: RootReducerState) => ({
    graphs: User.user.graphs
  }));

  return (
    <BarGraph
      data={data}
      dataKey="seconds"
      label={label}
      width={width}
      height={height}
      className={className}
    />
  );
}

export default TimeGraph;
