/* eslint-disable indent */
/* eslint-disable react/no-multi-comp */
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { ExplicitAny, RootReducerState } from "../../../../global";
import React, { memo } from "react";
import { Empty } from "antd";
import { useSelector } from "react-redux";

interface PieGraphProps {
  width: number;
  height: number;
  iconSize: number;
  className?: string;
}

const COLORS = ["rgba(0, 0, 0, 0.2)", "rgba(255, 255, 255, 0.1)"];
const RADIAN = Math.PI / 180;

function PieGraph({ width, height, iconSize, className = "" }: PieGraphProps) {
  const {
    graphs: { winsRatio }
  } = useSelector(({ User }: RootReducerState) => ({
    graphs: User.user.graphs
  }));

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

  return winsRatio.length > 0 ? (
    <PieChart
      width={width}
      height={height}
      className={`statisticsPieChart ${className}`}
    >
      <Pie
        data={winsRatio}
        cx={width / 2}
        cy={width / 2}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={height / 3}
        dataKey="value"
      >
        {winsRatio.map((entry: ExplicitAny, index: ExplicitAny) => (
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
      <Legend iconSize={iconSize} iconType="circle" />
    </PieChart>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="piechartEmpty" />
  );
}

export default memo(PieGraph);
