import {
  BodyContent,
  BodyContentHeader,
  BodyContentHeaderLayout,
  BodyText,
  BodyTextStyle,
  BodyTextStylePlace,
  CommentImage,
  CommentUserName,
  Container,
  FirstText,
  FirstTextStyle,
  ImageAlign,
  InnerBody,
  InnerBodyLayout,
  Time,
  GoThread,
} from "./CommentBody.styled";
import Moment from "react-moment";
// import Moment from "react-moment";
import CommentUserImage from "../../Assets/People_Image.jpg";
import PostFooter from "../PostFooter/PostFooter";
import { Link } from "react-router-dom";
import isJsonString from "Features/Post/Utils/isJsonString";
import RichTextPostBody from "Features/Post/Components/RichTextPostBody/RichTextPostBody";
/**
 * Component that render the CommentBody.
 *
 * @Component
 * @param {object} commentBody - contain commentBody
 * @returns {React.Component}
 */
const CommentBody = ({ commentBody, comment }) => {
  // console.log(commentBody, "com");
  // console.log(comment, "commmm");
  if (commentBody) {
    console.log(commentBody.CommentUserImage);
    return (
      <Container>
        <FirstText>
          <Link to="#">
            {commentBody.postContent && (
              <FirstTextStyle>{commentBody.postContent}</FirstTextStyle>
            )}
          </Link>
        </FirstText>
        <InnerBody>
          <InnerBodyLayout>
            <ImageAlign>
              <Link to="#">
                <div>
                  {commentBody.commentUserImage && (
                    <CommentImage
                      crossOrigin="anonymous"
                      src={`https://api.redditswe22.tech/users/files/${commentBody.commentUserImage}`}
                      alt="People Icon"
                    />
                  )}
                </div>
              </Link>
            </ImageAlign>
            <BodyContent>
              <BodyContentHeader>
                <BodyContentHeaderLayout>
                  <CommentUserName>
                    <div>
                      {commentBody.userName && (
                        <Link to="#">{commentBody.userName.substring(3)}</Link>
                      )}
                    </div>
                  </CommentUserName>
                  <span className="break">·</span>
                  <Time>
                    {/* {commentBody.time} */}
                    <Moment fromNow>{commentBody.time}</Moment>
                  </Time>
                </BodyContentHeaderLayout>
              </BodyContentHeader>
              <BodyText>
                <BodyTextStyle>
                  <BodyTextStylePlace
                    className="comment-content"
                    title="CommentBody"
                  >
                    {/* {commentBody.bodyContent} */}
                    {!isJsonString(comment.textJSON) && comment && (
                      <p>{comment.textJSON}</p>
                    )}
                    {isJsonString(comment.textJSON) && (
                      <RichTextPostBody post={comment} />
                    )}
                  </BodyTextStylePlace>
                </BodyTextStyle>
              </BodyText>
            </BodyContent>
          </InnerBodyLayout>
          <PostFooter postfooter={commentBody.postFooter} />
        </InnerBody>
        <GoThread href="#">Go to thread</GoThread>
      </Container>
    );
  }
};

export default CommentBody;
