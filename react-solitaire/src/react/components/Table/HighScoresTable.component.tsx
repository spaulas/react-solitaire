import React from "react";
import { Table } from "antd";

const { Column } = Table;

interface HighScore {
  userName: string;
  finalScore: number;
}

interface HighScoresTableProps {
  data: Array<HighScore>;
  className?: string;
}

function HighScoresTable({ data, className }: HighScoresTableProps) {
  return (
    <Table<HighScore>
      className={className}
      dataSource={data}
      rowKey="userName"
      pagination={false}
    >
      <Column
        key="userName"
        title="UserName"
        dataIndex="userName"
        align="center"
      />
      <Column
        key="finalScore"
        title="Final Score"
        dataIndex="finalScore"
        align="center"
      />
    </Table>
  );
}

export default HighScoresTable;
