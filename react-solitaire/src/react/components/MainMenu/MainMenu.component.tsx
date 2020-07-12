import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../components/Modals/ConfirmationModal.component";
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

  const { userId, hasSavedGame, savedGame } = useSelector(
    ({ User }: RootReducerState) => ({
      userId: User.id,
      hasSavedGame: User.hasSavedGame,
      savedGame: User.savedGame
    })
  );

  // eslint-disable-next-line no-console
  console.log("userId = ", userId);

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
      {userId === "localStorageUser" && (
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

      {userId !== "localStorageUser" && (
        <Row className="buttonSpaceRow" align="middle" justify="center">
          <MenuButton
            className={getAnimation()}
            // eslint-disable-next-line no-console
            onClick={handleLogout}
            // if the usercomes from firebase: auth.signOut()
          >
            <span>Logout</span>
          </MenuButton>
        </Row>
      )}
    </>
  );
}

export default memo(MainMenu);
