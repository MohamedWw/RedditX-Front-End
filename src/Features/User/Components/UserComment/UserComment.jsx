import {
  CommentHeaderContainer,
  CommentHeaderContent,
  CommentHeaderInnerContainer,
  CommentHeaderInfo,
  UserLink,
  PostTitleLink,
  CommentHeaderRoot,
  CommunityLink,
  Dot,
  PostedLink,
  CommentBodyContainer,
  CommentBodyInnerContainer,
  CommentBodyContent,
  DashedLine,
  CommentBodyInfoContainer,
  CommentBodyInfoInnerContainer,
  CommentedContainer,
  CommentedLink,
  Point,
  DaysLink,
  CommentContainer,
  CommentInnerContainer,
  ReplyShareContainer,
  ReplyShareButton,
  ThreeDotsButton,
  StyledCommentLink,
} from "./UserComment.styled";
import { FaRegCommentAlt } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import RichTextPostBody from "Features/Post/Components/RichTextPostBody/RichTextPostBody";
import { useUserID } from "Features/User/Contexts/UserIDProvider";
import Moment from "react-moment";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * comment component
 *
 * @param {object} comment - comment object to be viewed
 * @param {boolean} overview - if true, the comment will be shown in overview mode
 * @returns {React.Component}
 */
const UserComment = ({ comment, overview }) => {
  const { userID } = useUserID;
  const [title, setTitle] = useState("");
  const [communityName, setCommunityName] = useState("");
  const [poster, setPoster] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    comment &&
      comment.postID &&
      comment.postID.title &&
      setTitle(comment.postID.title);

    comment &&
      comment.postID &&
      comment.postID.communityID &&
      comment.postID.communityID._id &&
      setCommunityName(comment.postID.communityID._id);

    comment &&
      comment.postID &&
      comment.postID.userID &&
      comment.postID.userID._id &&
      setPoster(comment.postID.userID._id);

    comment && comment.authorId && setAuthor(comment.authorId);
  }, [comment]);

  /**
   * function that check string if it is json
   *
   * @param {string} str - string to be checked
   * @returns {boolean}
   */
  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * function handle click on comment
   *
   * @param {event} e - event of click
   */
  function handleClick(e) {
    // console.log(e.currentTarget.nodeName)
    if (e.target.nodeName !== "A") {
      comment &&
        comment.postID &&
        comment.postID._id &&
        comment._id &&
        navigate(`/post-preview/${comment.postID._id}/${comment._id}`);
      e.stopPropagation();
    }
  }

  /**
   * header of comment
   *
   * @param {string} user - user name
   * @param {string} title - post title that commented it
   * @param {string} community - community name
   * @param {string} posted - user name that posted the post
   * @returns {React.Component}
   */
  const CommentHeader = ({ user, title, community, posted }) => {
    return (
      <CommentHeaderContainer>
        <CommentHeaderInnerContainer>
          <CommentHeaderContent>
            <span className="icon">
              <FaRegCommentAlt />
            </span>
            <CommentHeaderInfo>
              <UserLink to={`/user/${user}`}>{user.substring(3)}</UserLink>
              {` commented on `}
              {comment && comment.postID && comment.postID._id && (
                <PostTitleLink to={`/post-preview/${comment.postID._id}`}>
                  {title}
                </PostTitleLink>
              )}
              <Dot>.</Dot>
              <CommentHeaderRoot>
                <CommunityLink
                  to={`/subreddit/${community}`}
                >{`r/${community.substring(3)}`}</CommunityLink>
                <Dot>.</Dot>
                {`Posted by `}
                <PostedLink>{`u/${posted}`}</PostedLink>
              </CommentHeaderRoot>
            </CommentHeaderInfo>
          </CommentHeaderContent>
        </CommentHeaderInnerContainer>
      </CommentHeaderContainer>
    );
  };

  /**
   * comment body details
   *
   * @param {string} commented - user name that commented
   * @param {string} commentContent - comment content
   * @returns {React.Component}
   */
  const CommentBodyInfo = ({ commented, commentContent }) => {
    return (
      <CommentBodyInfoContainer overview={overview ? 1 : 0}>
        <CommentBodyInfoInnerContainer>
          <CommentedContainer>
            <CommentedLink to={`/user/${commented}`}>
              {commented.substring(3)}
            </CommentedLink>
            <Point>1 point</Point>
            <Dot>.</Dot>
            <DaysLink to="#">
              {comment && comment.createdAt && (
                <Moment fromNow>{comment.createdAt}</Moment>
              )}
            </DaysLink>
          </CommentedContainer>
          <div>
            <CommentContainer>
              <CommentInnerContainer>
                <p>
                  {comment.textJSON && isJsonString(comment.textJSON) && (
                    <RichTextPostBody post={comment} />
                  )}
                  {comment.textJSON &&
                    !isJsonString(comment.textJSON) &&
                    comment.textJSON}
                </p>
              </CommentInnerContainer>
            </CommentContainer>
            <div>
              <ReplyShareContainer>
                <ReplyShareButton>Reply</ReplyShareButton>
                <ReplyShareButton>Share</ReplyShareButton>
                <ThreeDotsButton>
                  <span className="icon">
                    <BiDotsHorizontalRounded />
                  </span>
                </ThreeDotsButton>
              </ReplyShareContainer>
            </div>
          </div>
        </CommentBodyInfoInnerContainer>
      </CommentBodyInfoContainer>
    );
  };

  /**
   *
   * @param {string} commented - user name that commented
   * @param {string} commentContent - comment content
   * @returns {React.Component}
   */
  const CommentBody = ({ commented, commentContent }) => {
    return (
      <CommentBodyContainer>
        <CommentBodyInnerContainer>
          <CommentBodyContent>
            <DashedLine></DashedLine>
            <CommentBodyInfo
              commented={commented}
              commentContent={commentContent}
            />
          </CommentBodyContent>
        </CommentBodyInnerContainer>
      </CommentBodyContainer>
    );
  };

  return (
    <div onClick={handleClick}>
      <div>
        <CommentHeader
          user={author}
          title={title}
          community={communityName}
          posted={poster}
        />

        <CommentBody commented={author} />
      </div>
    </div>
  );
};

export default UserComment;
