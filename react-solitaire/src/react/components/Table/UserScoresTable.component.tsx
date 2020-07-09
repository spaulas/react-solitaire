/* eslint-disable no-console */
import React, { useState } from "react";
import ExpandTableIcon from "./ExpandTableIcon.component";
import { Table } from "antd";
import moment from "moment";

const { Column } = Table;

interface UserScore {
  time: number;
  seconds: number;
  moves: number;
  nHints: number;
  finalScore: number;
  date: Date;
}

interface UserScoresTableProps {
  data: Array<UserScore>;
  className?: string;
}

function UserScoresTable({ data, className }: UserScoresTableProps) {
  const [expandTable, setExpandTable] = useState(false);

  return (
    <Table<UserScore>
      className={className}
      dataSource={data}
      rowKey="date"
      pagination={{ pageSize: 10 }}
    >
      <Column
        className={expandTable ? "columnDateExpanded" : "columnDateNotExpanded"}
        key="date"
        title="Date"
        dataIndex="date"
        align="center"
        sorter={(a: UserScore, b: UserScore) =>
          moment(a.date).unix() - moment(b.date).unix()
        }
      />
      <Column
        key="finalScore"
        title={
          <div>
            <span>Final Score</span>
            <ExpandTableIcon onClick={setExpandTable} />
          </div>
        }
        dataIndex="finalScore"
        align="center"
        defaultSortOrder="descend"
        sorter={(a: UserScore, b: UserScore) => a.finalScore - b.finalScore}
      />
      {expandTable && [
        <Column
          key="moves"
          title="Moves"
          dataIndex="moves"
          align="center"
          sorter={(a: UserScore, b: UserScore) => a.moves - b.moves}
        />,
        <Column
          key="nHints"
          title="Hints"
          dataIndex="nHints"
          align="center"
          sorter={(a: UserScore, b: UserScore) => a.nHints - b.nHints}
        />,
        <Column
          key="time"
          title="Time"
          dataIndex="time"
          align="center"
          sorter={(a: UserScore, b: UserScore) => a.seconds - b.seconds}
        />
      ]}
    </Table>
  );
}

export default UserScoresTable;
