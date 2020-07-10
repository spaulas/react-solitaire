import React, { memo, useEffect, useState } from "react";
import ConfirmationModal from "../../components/Modals/ConfirmationModal.component";
import { ExplicitAny } from "../../../global";
import MenuButton from "../../components/Buttons/MenuButton.component";
import { Row } from "antd";
import { useHistory } from "react-router-dom";

interface MainMenuProps {
  showStartAnimation: boolean;
  showBackAnimation: boolean;
  showLoginForm: () => void;
}

function MainMenu({
  showStartAnimation,
  showBackAnimation,
  showLoginForm
}: MainMenuProps) {
  const history = useHistory();
  const [showAlarm, setShowAlarm] = useState(false);
  const [offlineUser, setOfflineUser] = useState<ExplicitAny>({});

  const mountComponent = () => {
    const currentLocal = localStorage.getItem("offlineUser");
    setOfflineUser(currentLocal ? JSON.parse(currentLocal) : {});
  };
  useEffect(mountComponent, []);

  const getAnimation = () => {
    if (showStartAnimation) {
      return "startButtonAnimated";
    } else if (showBackAnimation) {
      return "loginButtonAnimated";
    } else return "";
  };

  return (
    <>
      <Row align="middle" justify="center">
        <MenuButton onClick={showLoginForm} className={getAnimation()}>
          <span>Login</span>
        </MenuButton>
      </Row>
      {offlineUser.hasSavedGame ? (
        <>
          <Row className="buttonSpaceRow" align="middle" justify="center">
            <MenuButton
              location="/game"
              params={{ savedGame: offlineUser.savedGame }}
              className={getAnimation()}
            >
              <span>Resume Game</span>
            </MenuButton>
          </Row>
          <Row className="buttonSpaceRow" align="middle" justify="center">
            <MenuButton
              onClick={() => setShowAlarm(true)}
              className={getAnimation()}
            >
              <span>Start Game</span>
            </MenuButton>
          </Row>
          {showAlarm ? (
            <ConfirmationModal
              onConfirm={() => history.push("/game")}
              onCancel={() => setShowAlarm(false)}
              message="By starting a new game, the saved game will be lost. Do you wish to
        continue?"
            />
          ) : null}
        </>
      ) : (
        <Row className="buttonSpaceRow" align="middle" justify="center">
          <MenuButton location="/game" className={getAnimation()}>
            <span>Start Game</span>
          </MenuButton>
        </Row>
      )}
      <Row className="buttonSpaceRow" align="middle" justify="center">
        <MenuButton
          location="/scores/userHighScores"
          className={getAnimation()}
        >
          <span>Scores</span>
        </MenuButton>
      </Row>
      <Row className="buttonSpaceRow" align="middle" justify="center">
        <MenuButton location="/statistics" className={getAnimation()}>
          <span>Statistics</span>
        </MenuButton>
      </Row>

      <Row className="buttonSpaceRow" align="middle" justify="center">
        <MenuButton
          className={getAnimation()}
          // eslint-disable-next-line no-console
          onClick={() => console.log("LOGOUT HERE")}
        >
          <span>Logout</span>
        </MenuButton>
      </Row>
    </>
  );
}

export default memo(MainMenu);
