import React, { ReactElement } from "react";
import { Col } from "antd";

interface SimplePileProps {
  getCards: () => Array<ReactElement>;
  pileId: string;
  offset?: number;
  pileClassName?: string;
  insideClassName?: string;
}

/**
 * Component that simply distributes the cards as a column, depending on the classnames provided, the result could be either a deck or a column
 */
function SimplePile({
  getCards,
  pileId,
  offset,
  pileClassName = "",
  insideClassName = ""
}: SimplePileProps) {
  return (
    <Col id={pileId} span={3} offset={offset} className={pileClassName}>
      <div className={insideClassName}>
        <div className="cardPileContainer">{getCards()}</div>
      </div>
    </Col>
  );
}

export default SimplePile;
