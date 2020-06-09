import React, { useEffect } from "react";
import { connect } from "react-redux";
import { forceCheck } from "react-lazyload";
import * as actionTypes from "./store/actionCreators";
import Slider from "../../components/slider";
import RecommendList from "../../components/list";
import Scroll from "../../baseUI/scroll";
import { Content } from "./style";
import Loading from "../../baseUI/loading/index";

function Recommend(props) {
  const { bannerList, recommendList, enterLoading } = props;
  console.log(bannerList, recommendList);
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    //推荐页面数据缓存，只请求一次
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
    //eslint-disable-next-line
  }, []);
  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];
  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {enterLoading ? <Loading></Loading> : null}
    </Content>
  );
}
const mapStateToProps = state => ({
  bannerList: state.getIn(["recommend", "bannerList"]),
  recommendList: state.getIn(["recommend", "recommendList"]),
  enterLoading: state.getIn(["recommend", "enterLoading"])
});
const mapDispatchToProps = dispatch => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
