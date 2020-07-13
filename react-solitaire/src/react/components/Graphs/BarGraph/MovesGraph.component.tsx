import BarGraph from "./BarGraph.component";
import React from "react";
import { RootReducerState } from "../../../../global";
import { useSelector } from "react-redux";

interface MovesGraphProps {
  width: number;
  height: number;
}

function MovesGraph({ width, height }: MovesGraphProps) {
  const {
    graphs: {
      moves: { data, label }
    }
  } = useSelector(({ User }: RootReducerState) => ({
    graphs: User.user.graphs
  }));

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
