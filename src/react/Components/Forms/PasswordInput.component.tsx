import { Input, Tooltip } from "antd";
import React, { useState } from "react";
import { ExplicitAny } from "../../../global";
import { FormattedMessage } from "react-intl";
import { InfoCircleOutlined } from "@ant-design/icons";

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
  const [inputFocused, setInputFocused] = useState<boolean>(false);
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
      <Input.Password
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        className={`divButton loginButtonAnimated formPassword`}
        onChange={handlePwdChange}
        onPressEnter={onPressEnter}
      />
      <label
        className={`labelPlaceholder ${
          password.length > 0 || inputFocused ? "passwordFocused" : ""
        }`}
      >
        <FormattedMessage
          id={confirmPwd ? "form.confirmPassword" : "form.password"}
        />
      </label>
      {!confirmPwd && (
        <Tooltip title={<FormattedMessage id="form.info.pwd" />}>
          <InfoCircleOutlined className="inputIcons infoIcon" />
        </Tooltip>
      )}
    </>
  );
}

export default PasswordInput;
