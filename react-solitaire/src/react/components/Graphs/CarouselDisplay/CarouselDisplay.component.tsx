import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Carousel } from "antd";
import { ExplicitAny } from "../../../../global";
import { FormattedMessage } from "react-intl";
import MovesGraph from "../BarGraph/MovesGraph.component";
import Piegraph from "../PieGraph/PieGraph.component";
import TimeGraph from "../BarGraph/TimeGraph.component";

function CarouselDisplay() {
  const [carouselRef, setCarouselRef] = useState<ExplicitAny>(undefined);
  const [countKey, setCountKey] = useState(0);

  const next = () => {
    carouselRef?.slick.slickNext();
    setCountKey(countKey + 1);
  };

  const previous = () => {
    carouselRef?.slick.slickPrev();
    setCountKey(countKey + 1);
  };

  return (
    <div className="statisticsCarouselContainer">
      <LeftOutlined
        className="carouselArrow carouselArrowLeft"
        onClick={previous}
      />
      <Carousel
        ref={(e: ExplicitAny) => setCarouselRef(e)}
        className="statisticsCarousel"
      >
        <div>
          <div className="tabTitle">
            <FormattedMessage id="statistics.winRatio" />
          </div>
          <Piegraph key={countKey} width={500} height={600} />
        </div>
        <div>
          <div className="tabTitle">
            <FormattedMessage id="statistics.movesPerGame" />
          </div>
          <MovesGraph key={countKey + 1} width={1000} height={500} />
        </div>
        <div>
          <div className="tabTitle">
            <FormattedMessage id="statistics.timePerGame" />
          </div>
          <TimeGraph key={countKey + 2} width={1000} height={500} />
        </div>
      </Carousel>
      <RightOutlined
        className="carouselArrow carouselArrowRight"
        onClick={next}
      />
    </div>
  );
}

export default CarouselDisplay;
