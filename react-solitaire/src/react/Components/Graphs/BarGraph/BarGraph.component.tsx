import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { Empty } from "antd";
import React from "react";

interface BarGraphProps {
  width: number;
  height: number;
  data: Array<object>;
  dataKey: string;
  label: Record<string, number>;
  className?: string;
}

function BarGraph({
  width,
  height,
  data,
  dataKey,
  label,
  className = ""
}: BarGraphProps) {
  return data?.length > 0 ? (
    <BarChart
      width={width}
      height={height}
      data={data}
      barCategoryGap={0}
      className={`statisticsBarChart ${className}`}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip
        cursor={{
          fill: "rgba(0,0,0,0.2)"
        }}
        labelFormatter={(bar: string | number) => (
          <span>{`${label[bar]} ${label[bar] > 1 ? "games" : "game"}`}</span>
        )}
      />
      <Bar dataKey={dataKey} fill="rgba(255, 255, 255, 0.1)" />
    </BarChart>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );
}

export default BarGraph;
