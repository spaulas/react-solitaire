import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { ExplicitAny /* , RootReducerState */ } from "../../../global";
import PageTitle from "../../components/PageTitle/PageTitle.component";
import { Tabs } from "antd";
import UserScoresTable from "../../components/Table/UserScoresTable.component";
// import pagesActions from "../../../redux/pages/pages.actions";

const { TabPane } = Tabs;

function ScoresPage() {
  const [offlineUser, setOfflineUser] = useState<ExplicitAny>({});

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

      <Tabs>
        <TabPane tab="Tab 1" key="1">
          <UserScoresTable data={offlineUser.history} className="scoresTable" />
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ScoresPage;
