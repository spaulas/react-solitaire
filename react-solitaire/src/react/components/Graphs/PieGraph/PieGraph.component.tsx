/* eslint-disable no-console */
/* eslint-disable react/forbid-dom-props */
/* eslint-disable react/no-multi-comp */
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { ExplicitAny } from "../../../../global";
import React from "react";

const data = [
  { name: "Wins", value: 70 },
  { name: "Losts", value: 30 }
];

const COLORS = ["rgba(0,0,0,0.6)", "rgba(0,0,0,0.4)"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
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

function Example() {
  return (
    <PieChart width={500} height={600} className="statisticsPieChart">
      <Pie
        data={data}
        cx={250}
        cy={250}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={150}
        fill="#8884d8"
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
      <Legend />
    </PieChart>
  );
}

export default Example;
