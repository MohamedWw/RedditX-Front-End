import { Link } from "react-router-dom";
import PostFooter from "../PostFooter/PostFooter";
import PostHeader from "../PostHeader/PostHeader";
import { ContainerPost } from "./Post.styled";

/**
 * Component that contains the PostslistItems included PostHeader Component and post body and PostFooter Component.
 *
 * @Component
 * @param {object} post - the info of the post
 * @returns {React.Component}
 */

const PostItem = ({ post }) => {
  // console.log(post);
  const postBody = {
    bodyImage: post.attachments[0],
    bodyText: post.text,
    flair: post.flairText,
  };
  const postFooter = {
    upVotes: post.votesCount,
    Comments: post.commentsNumber,
  };
  const postHeader = {
    headerImage: post.attachments[1],
    communityName: post.communityName,
    userName: post.userName,
    time: "5 days ago",
    flair: {
      flairText: post.flairText,
      flairColor: "green",
      flairBackgroundColor: "red",
    },
  };
  return (
    <ContainerPost pimage={postBody.bodyImage}>
      <div className="post-outline">
        <PostHeader postheader={postHeader} />
        <div className="post-body">
          <div className="post-body-content">
            <Link to="#">
              <div>
                <p>{postBody.bodyText}</p>
              </div>
            </Link>
            <span className="flair">{postBody.flair}</span>
          </div>
          <div className="post-image">
            <div className="img">
              <Link to="#">
                <div className="image"></div>
              </Link>
            </div>
          </div>
        </div>
        <PostFooter postfooter={postFooter} />
      </div>
    </ContainerPost>
  );
};

export default PostItem;