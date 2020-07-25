import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { forwardRef, useEffect, useState } from "react";
import { Carousel } from "antd";
import { ExplicitAny } from "../../../../global";
import { FormattedMessage } from "react-intl";
import MovesGraph from "../BarGraph/MovesGraph.component";
import Piegraph from "../PieGraph/PieGraph.component";
import TimeGraph from "../BarGraph/TimeGraph.component";

function CarouselDisplay(props: ExplicitAny, ref: ExplicitAny) {
  const [countKey, setCountKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const next = () => {
    ref?.current?.innerSlider?.slickNext();
    setCountKey(countKey + 1);
  };

  const previous = () => {
    ref?.current?.innerSlider?.slickPrev();
    setCountKey(countKey + 1);
  };

  const checkMobile = () => {
    if (!isMobile && window.innerWidth < 767) {
      setIsMobile(true);
    }
    if (isMobile && window.innerWidth >= 767) {
      setIsMobile(false);
    }
  };
  useEffect(checkMobile, []);

  return (
    <div className={`${props.className} statisticsCarouselContainer`}>
      <LeftOutlined
        className="carouselArrow carouselArrowLeft"
        onClick={previous}
      />
      <Carousel ref={ref} className="statisticsCarousel">
        <div>
          <div className="tabTitle">
            <FormattedMessage id="statistics.winRatio" />
          </div>
          <Piegraph
            key={countKey}
            width={isMobile ? 200 : 500}
            height={isMobile ? 240 : 600}
            iconSize={isMobile ? 20 : 50}
          />
        </div>
        <div>
          <div className="tabTitle">
            <FormattedMessage id="statistics.movesPerGame" />
          </div>
          <MovesGraph
            key={countKey + 1}
            width={isMobile ? 220 : 1000}
            height={isMobile ? 150 : 500}
          />
        </div>
        <div>
          <div className="tabTitle">
            <FormattedMessage id="statistics.timePerGame" />
          </div>
          <TimeGraph
            key={countKey + 2}
            width={isMobile ? 220 : 1000}
            height={isMobile ? 150 : 500}
          />
        </div>
      </Carousel>
      <RightOutlined
        className="carouselArrow carouselArrowRight"
        onClick={next}
      />
    </div>
  );
}

export default forwardRef(CarouselDisplay);
