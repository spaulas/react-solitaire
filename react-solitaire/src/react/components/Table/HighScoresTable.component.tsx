import { FormattedMessage } from "react-intl";
import React from "react";
import { RootReducerState } from "../../../global";
import { Table } from "antd";
import { useSelector } from "react-redux";

const { Column } = Table;

interface HighScore {
  userName: string;
  finalScore: number;
}

interface HighScoresTableProps {
  className?: string;
}

function HighScoresTable({ className }: HighScoresTableProps) {
  const { highScores } = useSelector(({ HighScores }: RootReducerState) => ({
    highScores: HighScores.highScores
  }));

  return (
    <Table<HighScore>
      className={className}
      dataSource={highScores}
      rowKey="userName"
      pagination={false}
    >
      <Column
        key="userName"
        title={<FormattedMessage id="table.userName" />}
        dataIndex="userName"
        align="center"
      />
      <Column
        key="finalScore"
        title={<FormattedMessage id="table.finalScore" />}
        dataIndex="finalScore"
        align="center"
      />
    </Table>
  );
}

export default HighScoresTable;
