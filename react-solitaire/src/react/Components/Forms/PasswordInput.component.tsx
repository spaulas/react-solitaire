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
}

function PasswordInput({ onChange, onPressEnter }: PasswordInputProps) {
  const [hidePwd, setHidePwd] = useState(true);
  return (
    <>
      <Input
        className={`divButton loginButtonAnimated formInput ${
          hidePwd ? "formPwd" : ""
        }`}
        onChange={onChange}
        onPressEnter={onPressEnter}
      />
      <label className="labelPlaceholder">password</label>
      <Tooltip title={<FormattedMessage id="form.info.pwd" />}>
        <InfoCircleFilled className="inputIcons infoIcon" />
      </Tooltip>
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
