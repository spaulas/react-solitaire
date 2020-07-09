import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import ExpandTableIcon from "../../components/Table/ExpandTableIcon.component";
import { ExplicitAny /* , RootReducerState */ } from "../../../global";
import PageTitle from "../../components/PageTitle/PageTitle.component";
import { Table } from "antd";
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
        pagination={{ pageSize: 4 }}
      >
        <Column
          className={
            expandTable ? "columnDateExpanded" : "columnDateNotExpanded"
          }
          key="date"
          title="Date"
          dataIndex="date"
          align="center"
          sorter
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
          sorter
        />
        {expandTable && [
          <Column
            key="moves"
            title="Moves"
            dataIndex="moves"
            align="center"
            sorter
          />,
          <Column
            key="nHints"
            title="Hints"
            dataIndex="nHints"
            align="center"
            sorter
          />,
          <Column
            key="time"
            title="Time"
            dataIndex="time"
            align="center"
            sorter
          />
        ]}
      </Table>
    </div>
  );
}

export default ScoresPage;
