// Import components
import PostFlagsWrapper from "Features/Post/Components/PostFlagsWrapper/PostFlagsWrapper";
import DraftEditor from "Features/Post/Components/DraftEditor/DraftEditor";
import PostFormFooter from "Features/Post/Components/PostFormFooter/PostFormFooter";
import FlairModal from "Features/Post/Components/FlairModal/FlairModal";

// Import bootstrap components
import { Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

// Import styled components
import {
  PostButton,
  SaveDraftButton,
  StyledDraftEditorForm,
  SubmitButtons,
} from "./DraftEditorForm.styled";

// API services
import getPostFlairs from "Features/Post/Services/getFlairs";
import useFetchFunction from "Hooks/useFetchFunction";
import { useAuth } from "Features/Authentication/Contexts/Authentication";

// Import hooks
import { useState, useRef, useEffect } from "react";

// Import contexts
import { useSubmitDestination } from "Features/Post/Contexts/submitDestination";
import { useCreatePostTitle } from "Features/Post/Contexts/createPostTitle";
import {
  createPostAttachmentsContext,
  useCreatePostAttachments,
} from "Features/Post/Contexts/createPostAttachments";
import { useCreatePostText } from "Features/Post/Contexts/createPostText";

/**
 * The form of draft editor in create post page (Draft editor tab)
 * @param {Function} submitPost - Function to submit the post
 * @returns {React.Component} - Draft editor Form component (The form that appears when you click on the post tab in main section)
 */
const DraftEditorForm = ({ submitPost, isLoadingSubmit }) => {
  // State for flair modal
  const [modalShow, setModalShow] = useState(false);

  // State for all uploaded files (images, videos)
  const [files, setFiles] = useState([]);

  // State for editor state (text)
  const [text, setText] = useState("");

  // State for editor state (text)
  const [textHTML, setTextHTML] = useState("");

  // State for flair
  const [flairIndex, setFlairIndex] = useState(null);

  // Context state for title
  const { createPostTitle, setCreatePostTitle } = useCreatePostTitle();

  // Context state for attachments
  const { createPostAttachments, setCreatePostAttachments } =
    useCreatePostAttachments();

  // Context state for text
  const { createPostText, setCreatePostText } = useCreatePostText();

  // Ref for title
  const titleRef = useRef(null);

  // Context for selected submit destination
  const { submitDestination } = useSubmitDestination();

  // const [flairs, error, isLoading, reload] = useFetch({
  //   axiosInstance: axios,
  //   method: "GET",
  //   url: "/flairs/",
  //   requestConfig: {
  //     headers: {
  //       "Content-Language": "en-US",
  //     },
  //   },
  // });
  // Fetch flairs
  const auth = useAuth();
  let [flairs, error, isLoading, fetchData] = useFetchFunction();
  useEffect(() => {
    if (submitDestination)
      getPostFlairs(fetchData, submitDestination._id, auth);
  }, [submitDestination]);
  console.log("flairs = ", flairs);

  /**
   * Handle title change
   *
   * @param {Event} e - Event
   */
  const handleTitleChange = (e) => {
    if (e.target.value.length <= 300) {
      setCreatePostTitle(e.target.value);
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
  };

  /**
   * Handle key down
   *
   * @param {Event} e - Event
   */
  const handleKeyDown = (e) => {
    // Prevent enter key (new line)
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onModalHide = () => {
    setModalShow(false);
    setFlairIndex(null);
  };

  /**
   * Handle form submit
   */
  const submitForm = () => {
    setCreatePostAttachments(files);
    setCreatePostText(text);
    submitPost({
      type: "linkWithImage",
      textJSON: text,
      textHTML: textHTML,
      attachments: files,
    });
  };
  return (
    <>
      <FlairModal
        show={modalShow}
        onHide={onModalHide}
        flairIndex={flairIndex}
        setFlairIndex={setFlairIndex}
        flairList={flairs.flairs}
        error={error}
        isLoading={isLoading}
        postOrUser="post"
      />
      <StyledDraftEditorForm>
        <Form.Group className="title-group mb-3">
          <Form.Control
            ref={titleRef}
            as="textarea"
            placeholder="Title"
            value={createPostTitle}
            onChange={handleTitleChange}
            onKeyDown={handleKeyDown}
            rows={1}
            className="title-input"
            id="title"
          />
          <span>{createPostTitle.length}/300</span>
        </Form.Group>
        <DraftEditor
          files={files}
          setFiles={setFiles}
          text={text}
          setText={setText}
          setTextHTML={setTextHTML}
        />
        <PostFlagsWrapper flairHandler={setModalShow} />
        <SubmitButtons>
          {/* <SaveDraftButton variant="light">Save Draft</SaveDraftButton> */}
          <PostButton
            disabled={!submitDestination || !createPostTitle}
            onClick={submitForm}
            id="post"
          >
            {!isLoadingSubmit && "Post"}
            {isLoadingSubmit && <Spinner animation="border" variant="light" />}
          </PostButton>
        </SubmitButtons>
      </StyledDraftEditorForm>
      <PostFormFooter id={"DraftEditorForm"} />
    </>
  );
};

export default DraftEditorForm;
