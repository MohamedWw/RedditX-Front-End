import { BASE_URL } from "API/axios";
import {
BtnDiv, 
CommunityContainer, 
ViewAllBtn,
CoverDiv,
GradientDiv,
LinkH2,
CoverImg,
} from "./CommunityCard.styled";
import { useNavigate } from "react-router-dom";
import { CommunityOl } from "../Communities Container/CommunitiesContainer.styled";
import CommunitySideCardItem from "../../Components/CommunitySideCardItem/CommunityCardItem";
import axios from "API/axios";
import useFetch from "Hooks/useFetch";
import {Link} from "react-router-dom";
/**
 * Component that links each  of community card item.
 *
 * @Component
 * @param {object} communityList - array that contains all the Random Category communities
 * @returns {React.Component}
 */
const CommunitySideCard = ({communityList}) => {

    const navigate = useNavigate();
    
    const navigateToRandomCat = (categoryTitle) => {
        // 👇️ navigate to /contacts
        navigate(`/category/${categoryTitle}`);
    };
    let cat = 'Growing';    //Assign Random Category  [Can change to be a prop to change shown random among the two cards]
    let com; 

    if(communityList && communityList.communities &&communityList.length!==0) {
        
        cat = communityList.communities[0]['category'];   //Assign the Random Category to be shown [can call two requests in leaderboard Page, to have different radnoms in both cards]
        com = communityList.communities.slice(0,5).map((community, index) => {
            return (
                <li key={community._id}>
                    <CommunitySideCardItem
                    title = {community._id.substring(3)}
                    img = {community.icon}
                    index = {index+1}/>
                </li>
            );
        });
    }
    // const cat =
    
    return (
        <CommunityContainer>
              <CoverDiv>
                  <CoverImg
                    crossOrigin="anonynmous"
                    src={`${BASE_URL}/subreddits/files/${communityList.communities[1].banner}`}
                  />
                  <LinkH2>
                      <Link href={"https://www.reddit.com/subreddits/leaderboard/"}>Top
                          <span>&nbsp;{cat}&nbsp;</span>
                          Communities
                      </Link>
                  </LinkH2>
              </CoverDiv>
              <CommunityOl>
                  {com}
              </CommunityOl>
            <BtnDiv>
                <ViewAllBtn onClick={()=>navigateToRandomCat(cat)}>See All {cat}</ViewAllBtn>
            </BtnDiv>
        </CommunityContainer>
    );
};

export default CommunitySideCard;