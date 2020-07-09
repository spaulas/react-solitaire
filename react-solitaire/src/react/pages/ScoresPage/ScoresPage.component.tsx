import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import ExpandTableIcon from "../../components/Table/ExpandTableIcon.component";
import { ExplicitAny /* , RootReducerState */ } from "../../../global";
import PageTitle from "../../components/PageTitle/PageTitle.component";
import { Table } from "antd";
import moment from "moment";
// import pagesActions from "../../../redux/pages/pages.actions";

const { Column } = Table;

interface ScoresPageProps {
  time: number;
  moves: number;
  nHints: number;
  finalScore: number;
  date: Date;
}

function ScoresPage() {
  const [offlineUser, setOfflineUser] = useState<ExplicitAny>({});
  const [expandTable, setExpandTable] = useState(false);

  /*  const dispatch = useDispatch();
  const { showAnimation } = useSelector(({ Pages }: RootReducerState) => ({
    showAnimation: Pages.scoresPageAnimation
  }));
  const removeAnimation = () => {
    // after animation is over, set showAnimation to false
    setTimeout(() => dispatch(pagesActions.setStartPageAnimation(false)), 2500);
  };
  useEffect(removeAnimation, []);
   */

  useEffect(() => {
    const currentLocal = localStorage.getItem("offlineUser");
    setOfflineUser(currentLocal ? JSON.parse(currentLocal) : { history: [] });
  }, []);

  // eslint-disable-next-line no-console
  console.log("offline user ' ", offlineUser);
  return (
    <div className="pageBackground scoresPage">
      <PageTitle title="Scores" />
      <Table<ScoresPageProps>
        className="scoresTable"
        dataSource={offlineUser?.history}
        rowKey="date"
        pagination={{ pageSize: 10 }}
      >
        <Column
          className={
            expandTable ? "columnDateExpanded" : "columnDateNotExpanded"
          }
          key="date"
          title="Date"
          dataIndex="date"
          align="center"
          sorter={(a: ScoresPageProps, b: ScoresPageProps) =>
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
          sorter={(a: ScoresPageProps, b: ScoresPageProps) =>
            a.finalScore - b.finalScore
          }
        />
        {expandTable && [
          <Column
            key="moves"
            title="Moves"
            dataIndex="moves"
            align="center"
            sorter={(a: ScoresPageProps, b: ScoresPageProps) =>
              a.moves - b.moves
            }
          />,
          <Column
            key="nHints"
            title="Hints"
            dataIndex="nHints"
            align="center"
            sorter={(a: ScoresPageProps, b: ScoresPageProps) =>
              a.nHints - b.nHints
            }
          />,
          <Column
            key="time"
            title="Time"
            dataIndex="time"
            align="center"
            sorter={(a: ScoresPageProps, b: ScoresPageProps) => a.time - b.time}
          />
        ]}
      </Table>
    </div>
  );
}

export default ScoresPage;
