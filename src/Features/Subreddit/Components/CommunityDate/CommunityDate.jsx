import { useSubReddit } from "Features/Subreddit/Contexts/SubRedditProvider";
import { useSubRedditID } from "Features/Subreddit/Contexts/SubRedditIDProvider";
import { useIsModerator } from "Features/Subreddit/Contexts/IsModeratorProvider";
import { useEffect, useRef, useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FiEyeOff } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi";
import { TbCake } from "react-icons/tb";
import Moment from "react-moment";
import SaveChangesModal from "../SaveChangesModal/SaveChangesModal";
import { updateSettings } from "Features/Moderator/Services/communitySettingsApi";
import useFetchFunction from "Hooks/useFetchFunction";
import { useAuth } from "Features/Authentication/Contexts/Authentication";
import {
  AddDescription,
  BirthDay,
  ButtonsContainer,
  CancelButton,
  CharContainer,
  DescriptionContainer,
  DescriptionContent,
  DescriptionInnerContainer,
  InputContainer,
  Private,
  SaveButton,
  StaticDescriptionContainer,
} from "./CommunityDate.styled";

// const MONTHS = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

/**
 * Component contains created date and description
 *
 * @returns {React.Component}
 */
const CommunityDate = () => {
  const [description, setDescription] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const [dummyDescription, setDummyDescription] = useState(description);
  const [modalShow, setModalShow] = useState(false);
  const { isMod } = useIsModerator();
  const { communityID } = useSubRedditID();
  const textAreaRef = useRef();
  const [date, setDate] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const auth = useAuth();
  // let isPrivate = true;

  const [descData, descError, descLoading, descFetch] = useFetchFunction();

  /**
   * handle when click save description
   * 
   * @param {string} desc the description of community
   */
  const handleSaving = (desc) => {
    updateSettings(
      descFetch,
      { description: desc },
      communityID,
      auth.getToken()
    );
  };

  useEffect(() => {
    console.log(descData);
  }, [descData]);

  const { community } = useSubReddit();
  useEffect(() => {
    community && community.description && setDescription(community.description);
    community &&
      community.description &&
      setDummyDescription(community.description);

    if (community && community.createdAt)
      setDate(new Date(community.createdAt));
    if (
      community &&
      community.communityOptions &&
      community.communityOptions.privacyType
    ) {
      setIsPrivate(
        community.communityOptions.privacyType === "public" ? false : true
      );
    }
  }, [community]);

  /**
   * onchange set value of input text
   *
   * @param {event} e
   */
  function inputHandler(e) {
    setDescription(e.target.value);

    e.target.style.height = "0px";
    const scrollHeight = e.target.scrollHeight;

    // We then set the height directly, outside of the render loop
    // Trying to set this with state or a ref will product an incorrect value.
    e.target.style.height = scrollHeight + "px";
  }

  /**
   * handler when click to add description
   */
  function AddDescriptionHandler() {
    //set inputFocus true to show input text
    setInputFocus(true);
  }

  /**
   * handler on focus to set cursor
   *
   * @param {Event} e - event
   */
  function setCursor(e) {
    e.target.style.height = e.target.scrollHeight + "px";
    const pos = description.length;
    e.target.setSelectionRange(pos, pos);
  }
  /**
   * handler when blur from the input text of description
   *
   * @param {event} event
   */
  function blurInputHandler(event) {
    //if the click outside the container of input
    if (!event.currentTarget.contains(event.relatedTarget)) {
      // if there is a change in the description and doesn't save or cancel
      if (dummyDescription !== description) {
        //show modal
        setModalShow(true);
        // hide input
      } else setInputFocus(false);
    }
  }

  /**
   * onClick cancel handler
   */
  function cancelHandler() {
    setDescription(dummyDescription);
    setInputFocus(false);
  }

  /**
   * onClick save handler
   */
  function saveHandler() {
    setDummyDescription(description);
    handleSaving(description);
    setInputFocus(false);
  }

  /**
   * onClick discard on modal handler
   */
  function discardHandler() {
    setDescription(dummyDescription);
    setInputFocus(false);
    setModalShow(false);
  }

  /**
   * onClick save on modal handler
   */
  function saveModalHandler() {
    setDummyDescription(description);
    setInputFocus(false);
    setModalShow(false);
  }

  /**
   *
   * @param {function} click - handle when click on description
   * @returns {React.Component} description
   */
  const Description = ({ click }) => {
    return (
      <DescriptionContainer title="description-container" onClick={click}>
        <DescriptionInnerContainer>
          <DescriptionContent>
            {description}
            <span className="icon">
              <HiOutlinePencil />
            </span>
          </DescriptionContent>
        </DescriptionInnerContainer>
      </DescriptionContainer>
    );
  };

  /**
   * static description that can not edit
   * 
   * @returns {React.Component}
   */
  const StaticDescription = () => {
    return (
      <StaticDescriptionContainer>
        <DescriptionContent>
          {description}
          {!description &&
            communityID &&
            `Welcome to ${communityID.substring(3)}`}
        </DescriptionContent>
      </StaticDescriptionContainer>
    );
  };

  return (
    <>
      {!isMod && <StaticDescription />}
      {isMod && !inputFocus && !description && (
        <AddDescription onClick={AddDescriptionHandler} title="add-description">
          <div>Add description</div>
        </AddDescription>
      )}
      {isMod && !inputFocus && description && (
        <Description click={AddDescriptionHandler} />
      )}
      {isMod && inputFocus && (
        <InputContainer tabIndex="0" onBlur={blurInputHandler}>
          <textarea
            ref={textAreaRef}
            value={description}
            placeholder="Tell Us about your community"
            onChange={inputHandler}
            autoFocus
            onFocus={setCursor}
            maxLength={500}
            className="textarea"
            title="textarea"
          />
          <ButtonsContainer>
            <CharContainer tabIndex="0">
              {500 - description.length + " Characters remaining"}
            </CharContainer>
            <CancelButton onClick={cancelHandler} className="cancel">
              Cancel
            </CancelButton>
            <SaveButton onClick={saveHandler} className="save">
              Save
            </SaveButton>
          </ButtonsContainer>
        </InputContainer>
      )}
      <OverlayTrigger
        placement={"bottom"}
        overlay={
          <Tooltip>
            <Moment fromNow>{date}</Moment>
          </Tooltip>
        }
        delay="200"
      >
        <BirthDay>
          <div className="cake-day">
            <span className="icon">
              <TbCake />
            </span>
            {/* {date && <span className="text">{"created "+MONTHS[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear() }</span>} */}
            {date && (
              <span className="text">
                created <Moment format="MMM D YYYY">{date}</Moment>
              </span>
            )}
          </div>
        </BirthDay>
      </OverlayTrigger>
      {isPrivate && (
        <Private>
          <div className="container">
            <OverlayTrigger
              placement={"top"}
              overlay={
                <Tooltip>
                  Only approved users can view and submit to this community
                </Tooltip>
              }
              delay="200"
            >
              <span className="icon">
                <FiEyeOff />
              </span>
            </OverlayTrigger>
            <span className="text">Private</span>
          </div>
        </Private>
      )}
      <SaveChangesModal
        show={modalShow}
        onDiscard={discardHandler}
        onSave={saveModalHandler}
        onHide={() => setModalShow(false)}
        showX={true}
      />
    </>
  );
};

export default CommunityDate;
