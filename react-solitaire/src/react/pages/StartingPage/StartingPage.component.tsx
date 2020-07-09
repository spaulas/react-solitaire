import { ExplicitAny, RootReducerState } from "../../../global";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/Buttons/MenuButton.component";
import { Row } from "antd";
import pagesActions from "../../../redux/pages/pages.actions";

function StartingPage() {
  const dispatch = useDispatch();
  const [offlineUser, setOfflineUser] = useState<ExplicitAny>({});
  const { showAnimation } = useSelector(({ Pages }: RootReducerState) => ({
    showAnimation: Pages.startPageAnimation
  }));
  const mountComponent = () => {
    // after animation is over, set showAnimation to false
    setTimeout(() => dispatch(pagesActions.setStartPageAnimation(false)), 2500);

    const currentLocal = localStorage.getItem("offlineUser");
    setOfflineUser(currentLocal ? JSON.parse(currentLocal) : {});
  };
  useEffect(mountComponent, []);
  return (
    <div
      className={`startingPage ${showAnimation ? "startingPageAnimation" : ""}`}
    >
      <Row className="logoRow" align="middle" justify="center">
        <img
          className={`${showAnimation ? "logoAnimated" : "logoImage"}`}
          src={require("../../../images/icon.png")}
          alt=""
        />
      </Row>
      {offlineUser.hasSavedGame ? (
        <Row className="buttonSpaceRow" align="middle" justify="center">
          <MenuButton
            location="/game"
            params={{ savedGame: offlineUser.savedGame }}
            className={`${showAnimation ? "startButtonAnimated" : ""}`}
          >
            <span>Resume Game</span>
          </MenuButton>
        </Row>
      ) : null}
      <Row className="buttonSpaceRow" align="middle" justify="center">
        <MenuButton
          location="/game"
          className={`${showAnimation ? "startButtonAnimated" : ""}`}
        >
          <span>Start Game</span>
        </MenuButton>
      </Row>
      <Row className="buttonSpaceRow" align="middle" justify="center">
        <MenuButton
          location="/scores/userHighScores"
          className={`${showAnimation ? "startButtonAnimated" : ""}`}
        >
          <span>Scores</span>
        </MenuButton>
      </Row>
      <Row className="buttonSpaceRow" align="middle" justify="center">
        <MenuButton
          location="/statistics"
          className={`${showAnimation ? "startButtonAnimated" : ""}`}
        >
          <span>Statistics</span>
        </MenuButton>
      </Row>
    </div>
  );
}

export default memo(StartingPage);
