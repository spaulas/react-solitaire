import { FormattedMessage } from "react-intl";
import React from "react";
import { RootReducerState } from "../../../global";
import { useSelector } from "react-redux";

function ConfirmationModal() {
  const { onConfirm, onCancel, message1, message2, className } = useSelector(
    ({ Pages }: RootReducerState) => ({
      onConfirm: Pages.confirmationModalProps.onConfirm,
      onCancel: Pages.confirmationModalProps.onCancel,
      message1: Pages.confirmationModalProps.message1,
      message2: Pages.confirmationModalProps.message2,
      className: Pages.confirmationModalProps.className
    })
  );
  return (
    <div className={`gameFullDiv ${className}`}>
      <div className="resumeGameQuestion">{message1}</div>
      <div className="resumeGameQuestion resumeGameQuestion2">{message2}</div>
      {typeof onConfirm === "function" && (
        <div
          className={`animatedButton divButton resumeGameAnimatedButton resumeGameQuestion resumeQuestionAnswer`}
          onClick={onConfirm}
        >
          <FormattedMessage id="confirm.yes" />
        </div>
      )}
      {typeof onCancel === "function" && (
        <div
          className={`animatedButton divButton resumeGameAnimatedButton resumeGameQuestion resumeQuestionAnswer`}
          onClick={onCancel}
        >
          <FormattedMessage id="confirm.no" />
        </div>
      )}
    </div>
  );
}

export default ConfirmationModal;
