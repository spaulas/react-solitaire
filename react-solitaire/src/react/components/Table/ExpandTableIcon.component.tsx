import { CaretDownFilled, CaretRightFilled } from "@ant-design/icons";
import React, { memo, useState } from "react";
import { ExplicitAny } from "../../../global";
import { Tooltip } from "antd";

export interface ExpandTableIconProps {
  onClick: (value: boolean) => void;
  className?: string;
}

function ExpandTableIcon({ onClick, className = "" }: ExpandTableIconProps) {
  const [expanded, setExpanded] = useState(false);
  const [visibleTooltip, setVisibleTooltip] = useState(false);
  const ArrowIcon = expanded ? CaretRightFilled : CaretDownFilled;

  return (
    <Tooltip
      visible={visibleTooltip}
      onVisibleChange={setVisibleTooltip}
      title={expanded ? "minimize" : "expand"}
    >
      <ArrowIcon
        className={`iconsTable ${expanded && "iconsTableClicked"} ${className}`}
        onClick={(e: ExplicitAny) => {
          e.stopPropagation();
          e.preventDefault();
          setVisibleTooltip(false);
          setExpanded((prev: ExplicitAny) => !prev);
          onClick(!expanded);
        }}
      />
    </Tooltip>
  );
}

ExpandTableIcon.defaultProps = {
  onClick: () => false
};

export default memo(ExpandTableIcon);
