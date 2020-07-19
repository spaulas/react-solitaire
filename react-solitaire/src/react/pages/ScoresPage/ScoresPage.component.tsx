/* eslint-disable indent */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import HighScoresTable from "../../components/Table/HighScoresTable.component";
import JoyrideSteps from "./JoyrideSteps.component";
import PageTitle from "../../components/PageTitle/PageTitle.component";
import { RootReducerState } from "../../../global";
import { Tabs } from "antd";
import UserScoresTable from "../../components/Table/UserScoresTable.component";
import joyrideActions from "../../../redux/joyride/joyride.actions";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

interface ScoresPageProps {
  activeTab: string;
}

function ScoresPage({ activeTab }: ScoresPageProps) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { gameHistory, loggedOut } = useSelector(
    ({ User }: RootReducerState) => ({
      gameHistory: User.user.history,
      loggedOut: User.userRef === false
    })
  );

  /**
   * Triggered at mount
   * Starts the joyride
   */
  const initJoyride = () => {
    dispatch(joyrideActions.initJoyride("scores", JoyrideSteps({ loggedOut })));
  };
  useEffect(initJoyride, []);

  // @todo remove url here, use normal tab component
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
    <div className="joyrideScoresPage mainPage scoresPage">
      <PageTitle title={<FormattedMessage id="sidebar.scores" />} />

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane
          tab={
            <span className="joyrideScoresUser">
              <FormattedMessage id="sidebar.userHighScores" />
            </span>
          }
          key="1"
        >
          <UserScoresTable data={gameHistory} />
        </TabPane>
        <TabPane
          tab={
            <span className="joyrideScoresTop">
              <FormattedMessage id="sidebar.top10HighScores" />
            </span>
          }
          key="2"
        >
          <HighScoresTable className="scoresTable" />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ScoresPage;
