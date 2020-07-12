/* eslint-disable indent */
import HighScoresTable from "../../components/Table/HighScoresTable.component";
import PageTitle from "../../components/PageTitle/PageTitle.component";
import React from "react";
import { RootReducerState } from "../../../global";
import { Tabs } from "antd";
import UserScoresTable from "../../components/Table/UserScoresTable.component";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

interface ScoresPageProps {
  activeTab: string;
}

function ScoresPage({ activeTab }: ScoresPageProps) {
  const history = useHistory();

  const { gameHistory } = useSelector(({ User }: RootReducerState) => ({
    gameHistory: User.history
  }));

  const handleTabChange = (tabKey: string) => {
    switch (tabKey) {
      case "2":
        history.push("/scores/top10HighScores");
        break;
      default:
        history.push("/scores/userHighScores");
        break;
    }
  };

  return (
    <div className="pageBackground scoresPage">
      <PageTitle title="Scores" />

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Your HighScores" key="1">
          <UserScoresTable data={gameHistory} className="scoresTable" />
        </TabPane>
        <TabPane tab="Top 10 HighScores" key="2">
          <HighScoresTable className="scoresTable" />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ScoresPage;
