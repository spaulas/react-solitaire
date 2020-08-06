/* eslint-disable indent */
import React, { useEffect } from "react";
import { Tabs, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import HighScoresTable from "../../Components/Table/HighScoresTable.component";
import JoyrideSteps from "./JoyrideSteps.component";
import PageTitle from "../../Components/PageTitle/PageTitle.component";
import { RootReducerState } from "../../../global";
import UserScoresTable from "../../Components/Table/UserScoresTable.component";
import joyrideActions from "../../../redux/joyride/joyride.actions";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;
const { Text } = Typography;

interface ScoresPageProps {
  activeTab: string;
}

function ScoresPage({ activeTab }: ScoresPageProps) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { gameHistory, loggedIn } = useSelector(
    ({ User }: RootReducerState) => ({
      gameHistory: User.user.history,
      loggedIn: User.loggedIn
    })
  );

  /**
   * Triggered at mount
   * Starts the joyride
   */
  const initJoyride = () => {
    dispatch(joyrideActions.initJoyride("scores", JoyrideSteps({ loggedIn })));
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
            <Text ellipsis className="joyrideScoresUser">
              <FormattedMessage id="sidebar.userHighScores" />
            </Text>
          }
          key="1"
        >
          <UserScoresTable data={gameHistory} />
        </TabPane>
        <TabPane
          tab={
            <Text ellipsis className="joyrideScoresTop">
              <FormattedMessage id="sidebar.top10HighScores" />
            </Text>
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
