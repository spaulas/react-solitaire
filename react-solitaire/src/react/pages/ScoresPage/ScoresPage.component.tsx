/* eslint-disable indent */
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { ExplicitAny /* , RootReducerState */ } from "../../../global";
import HighScoresTable from "../../components/Table/HighScoresTable.component";
import PageTitle from "../../components/PageTitle/PageTitle.component";
import { Tabs } from "antd";
import UserScoresTable from "../../components/Table/UserScoresTable.component";
// import pagesActions from "../../../redux/pages/pages.actions";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

interface ScoresPageProps {
  activeTab: string;
}

function ScoresPage({ activeTab }: ScoresPageProps) {
  const [offlineUser, setOfflineUser] = useState<ExplicitAny>({});
  const history = useHistory();

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
          <UserScoresTable data={offlineUser.history} className="scoresTable" />
        </TabPane>
        <TabPane tab="Top 10 HighScores" key="2">
          <HighScoresTable
            data={offlineUser.top || []}
            className="scoresTable"
          />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ScoresPage;
