import React from "react";
import { connect } from "react-redux";
import { getRankList } from "./store";

function Rank(props) {
  const {rankList:list, loading} = props;
  const {getRankListDispatch} = props;
  let rankList = list ? list.toJS():[];
  return <div>Rank</div>;
}

const mapStateToProps = (state) => ({
  rankList: state.getIn(["rank", "rankList"]),
  loading: state.getIn(["rank", "loading"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDispatch() {
      dispatch(getRankList())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
