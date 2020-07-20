import { FormattedMessage, useIntl } from "react-intl";
import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../Modals/ConfirmationModal.component";
import MenuButton from "../Buttons/MenuButton.component";
import { RootReducerState } from "../../../global";
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
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showAlarm, setShowAlarm] = useState(false);

  const { loggedOut, hasSavedGame, savedGame } = useSelector(
    ({ User }: RootReducerState) => ({
      loggedOut: User.userRef === false,
      hasSavedGame: User.user.hasSavedGame,
      savedGame: User.user.savedGame
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
      {loggedOut && (
        <MenuButton
          onClick={showLoginForm}
          className={`joyrideLoginButton ${getAnimation()}`}
        >
          <FormattedMessage id="btn.login" />
        </MenuButton>
      )}
      {hasSavedGame ? (
        <>
          <MenuButton
            location="/game"
            params={{ savedGame }}
            className={`joyrideResumeGameButton ${getAnimation()}`}
          >
            <FormattedMessage id="btn.resumeGame" />
          </MenuButton>
          <MenuButton
            onClick={() => setShowAlarm(true)}
            className={`joyrideStartGameButton ${getAnimation()}`}
          >
            <FormattedMessage id="btn.startGame" />
          </MenuButton>
          {showAlarm ? (
            <ConfirmationModal
              onConfirm={() => history.push("/game")}
              onCancel={() => setShowAlarm(false)}
              message={intl.formatMessage({ id: "confirm.gameLost" })}
            />
          ) : null}
        </>
      ) : (
        <MenuButton
          location="/game"
          className={`joyrideStartGameButton ${getAnimation()}`}
        >
          <FormattedMessage id="btn.startGame" />
        </MenuButton>
      )}
      <MenuButton
        location="/scores/userHighScores"
        className={`joyrideScoresButton ${getAnimation()}`}
      >
        <FormattedMessage id="sidebar.scores" />
      </MenuButton>
      <MenuButton
        location="/statistics"
        className={`joyrideStatisticsButton ${getAnimation()}`}
      >
        <FormattedMessage id="sidebar.statistics" />
      </MenuButton>
      <MenuButton
        className={`joyrideConfigurationsButton ${getAnimation()}`}
        location="/configurations"
      >
        <FormattedMessage id="sidebar.configurations" />
      </MenuButton>

      {!loggedOut && (
        <MenuButton
          className={`joyrideLogoutButton ${getAnimation()}`}
          onClick={handleLogout}
        >
          <FormattedMessage id="btn.logout" />
        </MenuButton>
      )}
    </>
  );
}

export default memo(MainMenu);
