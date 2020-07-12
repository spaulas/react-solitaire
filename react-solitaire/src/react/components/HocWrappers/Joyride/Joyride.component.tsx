import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joyride from "react-joyride";
import { RootReducerState } from "../../../../global";
import { useIntl } from "react-intl";
import userActions from "../../../../redux/user/user.actions";

function BaseJoyride() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [run, setRun] = useState(false);

  const { page, steps, joyride } = useSelector(
    ({ Joyride, User }: RootReducerState) => ({
      page: Joyride.page,
      steps: Joyride.steps,
      joyride: User.settings.joyride
    })
  );

  const handlePageChange = () => {
    if (page && joyride[page]) {
      const joyrideCopy = { ...joyride };
      joyrideCopy[page] = false;
      setRun(true);
      dispatch(userActions.setJoyride(joyrideCopy));
    }
  };
  useEffect(handlePageChange, [page]);

  return (
    <Joyride
      run={run}
      steps={steps}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      disableScrolling
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