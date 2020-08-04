import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import MenuButton from "../Buttons/MenuButton.component";
import { RootReducerState } from "../../../global";
import { auth } from "../../../firebase/firebase.utils";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import highscoreActions from "../../../redux/highScores/highscores.actions";
import pageActions from "../../../redux/pages/pages.actions";
import { useHistory } from "react-router-dom";
import userActions from "../../../redux/user/user.actions";

interface MainMenuProps {
  showStartAnimation: boolean;
  showBackAnimation: boolean;
}

function MainMenu({ showStartAnimation, showBackAnimation }: MainMenuProps) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userName, loggedIn, hasSavedGame, savedGame } = useSelector(
    ({ User }: RootReducerState) => ({
      userName: User.user.userName,
      loggedIn: User.loggedIn,
      hasSavedGame: User.user.hasSavedGame,
      savedGame: User.user.savedGame
    })
  );

  const getAnimation = () => {
    if (showStartAnimation) {
      return "startButtonAnimated";
    } else {
      return "loginButtonAnimated";
    }
  };

  const handleLogout = () => {
    dispatch(userActions.clearUser());
    // logout user at firebase
    auth.signOut();
    // User at the redux should be from the localStorage
    dispatch(userActions.getLocalStorage());
    dispatch(highscoreActions.setOfflineHighScores());
  };

  const handleShowAlarm = () => {
    dispatch(gameBoardActions.showingConfirm(true));
    dispatch(
      pageActions.setConfirmationModal(
        <FormattedMessage id="confirm.gameLostSaved" />,
        <FormattedMessage id="confirm.startNew" />,
        handleCancelConfirm,
        handleHideConfirm,
        "adjustToGameOptions"
      )
    );
  };

  const handleHideConfirm = () => {
    dispatch(gameBoardActions.showingConfirm(false));
    history.push("/game");
  };

  const handleCancelConfirm = () => {
    dispatch(gameBoardActions.showingConfirm(false));
  };

  return (
    <>
      {loggedIn && (
        <div className={`welcomeMessage ${getAnimation()}`}>
          <FormattedMessage id="title.welcome" /> {userName}
        </div>
      )}
      {!loggedIn && (
        <MenuButton
          location="/login"
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
            onClick={handleShowAlarm}
            className={`joyrideStartGameButton ${getAnimation()}`}
          >
            <FormattedMessage id="btn.startGame" />
          </MenuButton>
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
      <MenuButton
        className={`joyrideAboutButton ${getAnimation()}`}
        location="/about"
      >
        <FormattedMessage id="sidebar.about" />
      </MenuButton>
      {loggedIn && (
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
