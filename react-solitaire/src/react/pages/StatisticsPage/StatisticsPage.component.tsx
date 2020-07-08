import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import BarGraph from "./BarGraph.component";
import { Carousel } from "antd";
import PageTitle from "../../components/UIComponents/PageTitle.component";
import Piegraph from "./PieGraph.component";
import React from "react";

function StatisticsPage() {
  return (
    <div className="pageBackground statisticsPage">
      <PageTitle title="Statistics" />
      <div className="statisticsCarouselContainer">
        <LeftOutlined className="carouselArrow carouselArrowLeft" />
        <Carousel className="statisticsCarousel">
          <div>
            <div className="tabTitle">Win/Lost Ratio</div>
            <Piegraph />
          </div>
          <div>
            <span>Win/Lost</span>
            <BarGraph />
          </div>
          <div>
            <span>Win/Lost</span>
            <BarGraph />
          </div>
        </Carousel>
        <RightOutlined className="carouselArrow carouselArrowRight" />
      </div>
    </div>
  );
}

export default StatisticsPage;
