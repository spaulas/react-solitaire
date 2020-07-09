import { AppstoreFilled, LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import BarGraph from "../../components/Graphs/BarGraph/BarGraph.component";
import { Carousel } from "antd";
import { ExplicitAny } from "../../../global";
import PageTitle from "../../components/PageTitle/PageTitle.component";
import Piegraph from "../../components/Graphs/PieGraph/PieGraph.component";

function StatisticsPage() {
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
    <div className="pageBackground statisticsPage">
      <PageTitle title="Statistics" />
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
            <div className="tabTitle">Win/Lost Ratio</div>
            <Piegraph key={countKey} />
          </div>
          <div>
            <div className="tabTitle">Moves Per Game</div>
            <BarGraph key={countKey + 1} />
          </div>
          <div>
            <div className="tabTitle">Time Per Game</div>
            <BarGraph key={countKey + 2} />
          </div>
        </Carousel>
        <RightOutlined
          className="carouselArrow carouselArrowRight"
          onClick={next}
        />
      </div>
      <AppstoreFilled className="toggleButton" />
    </div>
  );
}

export default StatisticsPage;
