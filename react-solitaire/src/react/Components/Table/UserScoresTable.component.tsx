import React, { useState } from "react";
import ExpandTableIcon from "./ExpandTableIcon.component";
import { FormattedMessage } from "react-intl";
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
}

function UserScoresTable({ data }: UserScoresTableProps) {
  const [expandTable, setExpandTable] = useState(false);

  return (
    <Table<UserScore>
      className={"scoresTable"}
      dataSource={data}
      rowKey="date"
      pagination={{ pageSize: 10 }}
    >
      <Column
        className={expandTable ? "columnExpanded" : "columnExpanded"}
        key="date"
        title={<FormattedMessage id="table.date" />}
        dataIndex="date"
        align="center"
        sorter={(a: UserScore, b: UserScore) =>
          moment(a.date).unix() - moment(b.date).unix()
        }
      />
      <Column
        key="finalScore"
        className={expandTable ? "columnExpanded" : "columnExpanded"}
        title={
          <div>
            <FormattedMessage id="table.finalScore" />
            <ExpandTableIcon
              className="joyrideScoresExpand"
              onClick={setExpandTable}
            />
          </div>
        }
        dataIndex="finalScore"
        align="center"
        defaultSortOrder="ascend"
        sorter={(a: UserScore, b: UserScore) => a.finalScore - b.finalScore}
      />
      {expandTable && [
        <Column
          key="moves"
          title={<FormattedMessage id="table.moves" />}
          dataIndex="moves"
          align="center"
          className="columnExpanded"
          sorter={(a: UserScore, b: UserScore) => a.moves - b.moves}
        />,
        <Column
          key="nHints"
          title={<FormattedMessage id="table.nHints" />}
          dataIndex="nHints"
          align="center"
          className="columnExpanded"
          sorter={(a: UserScore, b: UserScore) => a.nHints - b.nHints}
        />,
        <Column
          key="time"
          title={<FormattedMessage id="table.time" />}
          dataIndex="time"
          align="center"
          className="columnExpanded"
          sorter={(a: UserScore, b: UserScore) => a.seconds - b.seconds}
        />
      ]}
    </Table>
  );
}

export default UserScoresTable;
