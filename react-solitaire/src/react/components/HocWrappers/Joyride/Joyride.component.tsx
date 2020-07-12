import { ExplicitAny, RootReducerState } from "../../../../global";
import Joyride, { ACTIONS, CallBackProps } from "react-joyride";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import userActions from "../../../../redux/user/user.actions";

function BaseJoyride() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [run, setRun] = useState(false);

  const { page, steps, callback, joyride } = useSelector(
    ({ Joyride, User }: RootReducerState) => ({
      page: Joyride.page,
      steps: Joyride.steps,
      callback: Joyride.callback,
      joyride: User.settings.joyride
    })
  );

  const handlePageChange = () => {
    if (page && joyride[page]) {
      const joyrideCopy = { ...joyride };
      joyrideCopy[page] = true;
      setRun(true);
      dispatch(userActions.setJoyride(joyrideCopy));
    }
  };
  useEffect(handlePageChange, [page]);

  function joyrideCallback({
    action,
    index,
    lifecycle,
    type,
    ...rest
  }: CallBackProps) {
    // check if current status if on of skip or finish joyride type, to close joyride
    if (
      [ACTIONS.NEXT, ACTIONS.PREV].includes(action as ExplicitAny) &&
      typeof callback === "function"
    ) {
      callback(action, index);
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
          primaryColor: "red",
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

export default BaseJoyride;
