import { AppstoreFilled, LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import BarGraph from "./BarGraph.component";
import { Carousel } from "antd";
import PageTitle from "../../components/UIComponents/PageTitle.component";
import Piegraph from "./PieGraph.component";

function StatisticsPage() {
  const [carouselRef, setCarouselRef] = useState<any>(undefined);
  // eslint-disable-next-line no-console
  console.log("CAROUSL REDF = ", carouselRef?.slick);

  const next = () => {
    carouselRef?.slick.slickNext();
  };

  const previous = () => {
    carouselRef?.slick.slickPrev();
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
          ref={(e: any) => setCarouselRef(e)}
          className="statisticsCarousel"
        >
          <div>
            <div className="tabTitle">Win/Lost Ratio</div>
            <Piegraph />
          </div>
          <div>
            <div className="tabTitle">Moves Per Game</div>
            <BarGraph />
          </div>
          <div>
            <div className="tabTitle">Time Per Game</div>
            <BarGraph />
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
