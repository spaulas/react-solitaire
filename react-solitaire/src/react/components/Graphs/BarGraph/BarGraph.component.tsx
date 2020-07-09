/* eslint-disable react/forbid-dom-props */
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import React from "react";

const data = [
  {
    name: "[50-100]",
    moves: 2400
  },
  {
    name: "]100-200]",
    moves: 1398
  },
  {
    name: "[200-300]",
    moves: 9800
  },
  {
    name: "]300-400]",
    moves: 3908
  }
];

function Example() {
  return (
    <ResponsiveContainer
      width={1000}
      height={500}
      className="statisticsBarChart"
    >
      <BarChart width={1000} height={500} data={data} barCategoryGap={0}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip cursor={{ fill: "rgba(0,0,0,0.2)" }} />
        <Bar dataKey="moves" fill="rgba(255, 255, 255, 0.1)" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Example;
