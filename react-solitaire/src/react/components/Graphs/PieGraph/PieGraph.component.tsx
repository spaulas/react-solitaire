/* eslint-disable indent */
/* eslint-disable react/no-multi-comp */
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import React, { useEffect, useState } from "react";
import { Empty } from "antd";
import { ExplicitAny } from "../../../../global";

interface PieGraphProps {
  width: number;
  height: number;
}

const COLORS = ["rgba(0, 0, 0, 0.2)", "rgba(255, 255, 255, 0.1)"];
const RADIAN = Math.PI / 180;

function PieGraph({ width, height }: PieGraphProps) {
  const [data, setData] = useState([
    { name: "Wins", value: 0 },
    { name: "Losts", value: 0 }
  ]);
  const getData = () => {
    const currentLocal = localStorage.getItem("offlineUser");
    const offlineUser = currentLocal ? JSON.parse(currentLocal) : {};

    const gamesWon = offlineUser?.history?.length || 0;
    const nGames = offlineUser?.nGames || 0;

    setData(
      nGames > 0
        ? [
            { name: "Wins", value: gamesWon },
            { name: "Losts", value: nGames - gamesWon }
          ]
        : []
    );
  };
  useEffect(getData, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }: ExplicitAny) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return data.length > 0 ? (
    <PieChart width={width} height={height} className="statisticsPieChart">
      <Pie
        data={data}
        cx={width / 2}
        cy={width / 2}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={height / 3}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          border: "none",
          background: "white",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "20px"
        }}
      />
      <Legend iconSize={50} iconType="circle" />
    </PieChart>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );
}

export default PieGraph;
