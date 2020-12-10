import React, { useEffect } from "react";
import { connect } from "react-redux";
import Scroll from "../../baseUI/scroll/index";
import { getRankList } from "./store";
import Loading from '../../baseUI/loading';
import { filterIndex, filterIdx } from "../../api/utils";
import { SongList, Container, List, ListItem,EnterLoading } from "./style";

function Rank(props) {
  const { rankList: list, loading } = props;
  const { getRankListDispatch } = props;
  let rankList = list.toJS();
  useEffect(() => {
    if (!rankList.length) {
      getRankListDispatch();
    }
  }, []);
  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </SongList>
    ) : null;
  };
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map((item) => {
          return (
            <ListItem key={item.commentThreadId} tracks={item.tracks}>
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          );
        })}
      </List>
    );
  };
  let displayStyle = loading ? { display: "none" } : { display: "" };
  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
          {loading? <EnterLoading><Loading></Loading></EnterLoading>:null}
        </div>
      </Scroll>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  rankList: state.getIn(["rank", "rankList"]),
  loading: state.getIn(["rank", "loading"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDispatch() {
      dispatch(getRankList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
