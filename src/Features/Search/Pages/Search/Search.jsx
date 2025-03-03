import CommentsPage from "Features/Search/Layouts/CommentsPage/CommentsPage";
import CommunitiesPage from "Features/Search/Layouts/CommunitiesPage/CommunitiesPage";
import PeoplePage from "Features/Search/Layouts/PeoplePage/PeoplePage";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";
import React from "react";
// import Form from "react-bootstrap/Form";
import Links from "../../Components/MainHeader/MainHeader";
import Posts from "../../Layouts/PostsPage/Posts";
import { Container } from "./Search.styled";
import { useState, useEffect, useContext } from "react";
import useFetch from "Hooks/useFetch";
import axios from "API/axios";
import useFetchFunction from "Hooks/useFetchFunction";
import fetchPosts from "Features/Search/Services/fetchPosts";
import fetchComments from "Features/Search/Services/fetchComments";
import fetchCommunities from "Features/Search/Services/fetchCommunities";
import fetchPeople from "Features/Search/Services/fetchPeople";
import fetchSubbcomm from "Features/Search/Services/fetchSubbcomm";
import fetchPeopleFollowed from "Features/Search/Services/fetchPeopleFollowed";
import { useAuth } from "Features/Authentication/Contexts/Authentication";
import SearchContext from "Features/Search/Contexts/SearchWordContext/Search-context";
import fetchPostsCommunity from "Features/Search/Services/fetchPostsCommunity";
import fetchCommentsCommunity from "Features/Search/Services/fetchCommentsCommunity";
import getCommunitiesList from "Features/Post/Services/getCommunitiesList";
import SafeContext from "Features/Search/Contexts/SafeSearchContext/Safe-context";
/**
 * Component that contains the Search Page and the Main Links component and routes for the four pages Posts page, Comments page, Community page and People page.
 *
 * @Component
 * @returns {React.Component}
 */
const Search = () => {
  const ctx2 = useContext(SafeContext);
  // const [Sort, setSort] = useState("Relevance");
  /**
   * Function take the SortItem And Handle it
   * @param {String} SortItem
   */
  function OnSort(SortItem) {
    // // console.log(SortItem);
    // setSort(SortItem);
  }
  const auth = useAuth();
  const [ActiveLink, setActiveLink] = useState("posts");
  // Fetch Posts
  const [PostList, error, loading, fetch] = useFetchFunction();

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("query"), searchParams.get("destination"));
  const query = searchParams.get("query");
  const destination = searchParams.get("destination");

  console.log(PostList, "pppp");
  let [CommunityList, errorCommunity, loadingCommunity, fetchCommunity] =
    useFetchFunction();

  // fetch Communities

  let [CommentLists, errorComment, loadingComment, fetchComment] =
    useFetchFunction();

  console.log(CommentLists, "jjjj");

  let [PeopleList, errorPeople, loadingPeople, FB] = useFetchFunction();
  console.log(PeopleList);
  let [PeopleFollow, errorSub, loadingSub, fetchSub] = useFetchFunction();
  // fetch people follow
  console.log(PeopleFollow, "hhhhhhhhhhhhhh");
  // fetch communities subscribe

  let [communityListSub, errorSubs, isLoadingSubs, fetchData] =
    useFetchFunction();

  // fetch communities subscribe
  // const searchWord = "text";
  const ctx = useContext(SearchContext);
  useEffect(() => {
    ctx.wordHandler(query);
    if (destination) {
      ctx.isSubredditHandler(true);
      ctx.communityHandler(destination);
    } else {
      ctx.isSubredditHandler(false);
      ctx.communityHandler("");
    }
  }, [query, destination]);
  useEffect(() => {
    if (ctx.word !== "") {
      if (ctx.isSubreddit) {
        // fetchPostsCommunity(fetch, auth, ctx.word, ctx.community);
        fetchCommentsCommunity(fetchComment, auth, ctx.word, ctx.community);
      } else {
        // fetchPosts(fetch, auth, ctx.word, Sort);
        fetchComments(fetchComment, auth, ctx.word);
      }
      fetchCommunities(fetchCommunity, auth, ctx.word);
      fetchPeople(FB, auth, ctx.word);
      // fetchSubbcomm(reloadSubCommunities, auth);
      getCommunitiesList(fetchData, auth);
      fetchPeopleFollowed(fetchSub, auth);
    }
  }, [ctx.word, ctx.isSubreddit, ctx.community]); // Only re-run the effect if count changes
  //////////////////////////////
  useEffect(() => {
    if (ctx.word !== "") {
      fetchCommunities(fetchCommunity, auth, ctx.word);
      getCommunitiesList(fetchData, auth);
    }
  }, [ctx.word, ctx.isSubreddit, ctx.community, ctx2.Refetch]); // Only re-run the effect if count changes
  ///////////////////
  /////////////////////////////
  useEffect(() => {
    if (ctx.word !== "") {
      // fetchPeople(FB, auth, ctx.word);
      // fetchSubbcomm(reloadSubCommunities, auth);
      fetchPeopleFollowed(fetchSub, auth);
    }
  }, [ctx.word, ctx.isSubreddit, ctx.community, ctx2.RefetchPep]); // Only re-run the effect if count changes
  ///////////////////////////
  useEffect(() => {
    if (ctx.word !== "") {
      if (ctx.isSubreddit) {
        fetchPostsCommunity(fetch, auth, ctx.word, ctx.community, ctx.Sort);
      } else {
        fetchPosts(fetch, auth, ctx.word, ctx.Sort);
      }
    }
  }, [ctx.word, ctx.isSubreddit, ctx.community, ctx.Sort]); // Only re-run the effect if count changes

  return (
    <Container>
      <div className="outer-container">
        <div className="content-container">
          <div className="inner-container">
            <Links ActiveLink={ActiveLink} setActiveLink={setActiveLink} />
            <Routes>
              <Route
                path="posts"
                element={
                  // PostList &&
                  // PeopleFollow &&
                  // communityListSub &&
                  // CommunityList &&
                  // PeopleList &&
                  // !loading &&
                  // !loadingCommunity &&
                  // !isLoadingSubs &&
                  // !loadingSub &&
                  // !loadingPeople &&
                  <Posts
                    PostList={PostList}
                    CommunityList={CommunityList}
                    PeopleList={PeopleList}
                    PeopleFollow={PeopleFollow}
                    CommunitiesSub2={communityListSub}
                    OnSort={OnSort}
                  />
                }
              />
              <Route
                path="comments"
                element={
                  // CommentLists &&
                  // !loadingComment &&
                  <CommentsPage CommentLists={CommentLists} />
                }
              />
              <Route
                path="communities"
                element={
                  // communityListSub &&
                  // CommunityList &&
                  // !loadingCommunity &&
                  // !isLoadingSubs &&
                  <CommunitiesPage
                    CommunityList={CommunityList}
                    CommunitiesSub2={communityListSub}
                  />
                }
              />
              <Route
                path="people"
                element={
                  // PeopleFollow &&
                  // PeopleList &&
                  // !loadingSub &&
                  // !loadingPeople &&
                  <PeoplePage
                    PeopleList={PeopleList}
                    PeopleFollow={PeopleFollow}
                  />
                }
              />
              <Route
                path="/search"
                element={<Navigate to={"/search/posts"} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Search;
