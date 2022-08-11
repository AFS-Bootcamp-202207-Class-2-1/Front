import React, { useState, useEffect } from "react";
// import detail_comment_icon from '../assets/iconfont/detail_comment_icon.png'
import MovieBanner from "./MovieBanner";
import { Comment, List, Tooltip } from "antd";
import moment from "moment";
import "../../assets/less/movieComment.less";
import boy from "../../assets/images/boy.png";
import girl from "../../assets/images/girl.png";

const MovieComment = (props) => {
  const { comments } = props;
  console.log(comments);

  return (
    <div className="comment">
      <MovieBanner
        title="观影评论"
        icon="../assets/iconfont/detail_comment_icon.png"
      />
      <List
        className="comment-list"
        // header={`${comments.length} replies`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.usersName}
              avatar={
                item.usersGender === "male" ? (
                  <img src={boy} with="32px" height="32px"></img>
                ) : (
                  <img src={girl} with="32px" height="32px"></img>
                )
              }
              content={item.commentContent}
              datetime={item.commentTime}
            />
          </li>
        )}
      />
    </div>
  );
};

export default MovieComment;
