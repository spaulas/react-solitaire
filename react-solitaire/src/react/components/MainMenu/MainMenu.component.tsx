import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../components/Modals/ConfirmationModal.component";
import { FormattedMessage } from "react-intl";
import MenuButton from "../../components/Buttons/MenuButton.component";
import { RootReducerState } from "../../../global";
import { Row } from "antd";
import { auth } from "../../../firebase/firebase.utils";
import { useHistory } from "react-router-dom";
import userActions from "../../../redux/user/user.actions";

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
  const dispatch = useDispatch();
  const [showAlarm, setShowAlarm] = useState(false);

  const { userRef, hasSavedGame, savedGame } = useSelector(
    ({ User }: RootReducerState) => ({
      userRef: User.userRef,
      hasSavedGame: User.hasSavedGame,
      savedGame: User.savedGame
    })
  );

  const getAnimation = () => {
    if (showStartAnimation) {
      return "startButtonAnimated";
    } else if (showBackAnimation) {
      return "loginButtonAnimated";
    } else return "";
  };

  const handleLogout = () => {
    // logout user at firebase
    auth.signOut();
    // User at the redux should be from the localStorage
    dispatch(userActions.getLocalStorage());
  };

  return (
    <>
      {!userRef && (
        <Row align="middle" justify="center">
          <MenuButton onClick={showLoginForm} className={getAnimation()}>
            <span>Login</span>
          </MenuButton>
        </Row>
      )}
      {hasSavedGame ? (
        <>
          <Row className="buttonSpaceRow" align="middle" justify="center">
            <MenuButton
              location="/game"
              params={{ savedGame }}
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
              <FormattedMessage id="btn.startGame" />
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
            <FormattedMessage id="btn.startGame" />
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

      {userRef && (
        <Row className="buttonSpaceRow" align="middle" justify="center">
          <MenuButton className={getAnimation()} onClick={handleLogout}>
            <span>Logout</span>
          </MenuButton>
        </Row>
      )}
    </>
  );
}

export default memo(MainMenu);
