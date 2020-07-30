import {
  EyeInvisibleFilled,
  EyeOutlined,
  InfoCircleFilled
} from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import React, { useState } from "react";
import { ExplicitAny } from "../../../global";
import { FormattedMessage } from "react-intl";

interface PasswordInputProps {
  onChange: (e: ExplicitAny) => void;
  onPressEnter: () => void;
  confirmPwd: boolean;
}

function PasswordInput({
  onChange,
  onPressEnter,
  confirmPwd
}: PasswordInputProps) {
  const [hidePwd, setHidePwd] = useState<boolean>(true);
  const [password, setPassword] = useState("");

  const handlePwdChange = ({
    target: { value }
  }: {
    target: { value: string };
  }) => {
    setPassword(value);
    onChange({ target: { value } });
  };

  return (
    <>
      {hidePwd && (
        <div className="formPwdHidden">{password.replace(/./g, "*")}</div>
      )}
      <Input
        className={`divButton loginButtonAnimated formInput`}
        onChange={handlePwdChange}
        onPressEnter={onPressEnter}
      />
      <label className="labelPlaceholder">
        <FormattedMessage
          id={confirmPwd ? "form.confirmPassword" : "form.password"}
        />
      </label>
      {!confirmPwd && (
        <Tooltip title={<FormattedMessage id="form.info.pwd" />}>
          <InfoCircleFilled className="inputIcons infoIcon" />
        </Tooltip>
      )}
      {hidePwd ? (
        <EyeInvisibleFilled
          onClick={() => setHidePwd(false)}
          className="inputIcons pwdIcon"
        />
      ) : (
        <EyeOutlined
          onClick={() => setHidePwd(true)}
          className="inputIcons pwdIcon"
        />
      )}
    </>
  );
}

export default PasswordInput;
