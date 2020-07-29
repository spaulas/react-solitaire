import { ExplicitAny, RootReducerState } from "../../../global";
import Joyride, { ACTIONS, CallBackProps, STATUS } from "react-joyride";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import joyrideActions from "../../../redux/joyride/joyride.actions";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import userActions from "../../../redux/user/user.actions";

function BaseJoyride() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const location = useLocation();
  const [run, setRun] = useState(false);

  const { page, steps, callback, joyride } = useSelector(
    ({ Joyride, User }: RootReducerState) => ({
      page: Joyride.page,
      steps: Joyride.steps,
      callback: Joyride.callback,
      joyride: User.user.settings?.joyride
    })
  );

  const handlePageChange = () => {
    if (
      (location?.pathname.includes(page) ||
        (location?.pathname === "/" && page === "main") ||
        (location?.pathname === "/game" && page === "gameOptions")) &&
      joyride &&
      joyride[page]
    ) {
      const joyrideCopy = { ...joyride };
      joyrideCopy[page] = false;
      setRun(true);
      dispatch(userActions.setJoyride(joyrideCopy));
    }
  };
  useEffect(handlePageChange, [page, location]);

  function joyrideCallback({ action, index, status }: CallBackProps) {
    // check if current status if on of skip or finish joyride type, to close joyride
    if (
      [ACTIONS.NEXT, ACTIONS.PREV].includes(action as ExplicitAny) &&
      typeof callback === "function"
    ) {
      callback(action, index);
    }
    // check if current status if on of skip or finish joyride type, to close joyride
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as ExplicitAny)) {
      // Need to set our running state to false, so we can restart if we click start again.
      dispatch(joyrideActions.initJoyride("", []));
      setRun(false);
    }
  }

  return (
    <Joyride
      run={run}
      steps={steps}
      callback={joyrideCallback}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      disableOverlayClose
      disableCloseOnEsc
      locale={{
        back: intl.formatMessage({ id: "joyride.btn.back" }),
        last: intl.formatMessage({ id: "joyride.btn.last" }),
        skip: intl.formatMessage({ id: "joyride.btn.skip" }),
        next: intl.formatMessage({ id: "joyride.btn.forward" })
      }}
      styles={{
        options: {
          arrowColor: "#fff",
          backgroundColor: "#fff",
          primaryColor: "#a52d2d",
          textColor: "#000",
          zIndex: 1000
          // overlayColor: 'rgba(79, 26, 0, 0.4)'
        },
        buttonClose: {
          // hide close("X") button
          display: "none"
        }
      }}
    />
  );
}

export default memo(BaseJoyride);
