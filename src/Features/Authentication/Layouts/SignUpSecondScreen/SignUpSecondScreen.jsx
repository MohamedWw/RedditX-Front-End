/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "Features/Authentication/Contexts/Authentication";
import { useState, useEffect } from "react";

import { IoMdArrowBack } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";

import ReCAPTCHA from "react-google-recaptcha";

import RandomUserName from "Features/Authentication/Utils/RandomUserName";

import FormInput from "Features/Authentication/Components/FormInput/FormInput";
import Button from "../../Components/Button/Button";
import PasswordStrength from "Features/Authentication/Components/PasswordStrength/PasswordStrength";
import GetPasswordStrength from "Features/Authentication/Utils/GetPasswordStrenght";

import LoadingSpinner from "Features/Authentication/Components/LoadingSpinner/LoadingSpinner";

import Checked from "Features/Authentication/Components/Checked/Checked";

import axios from "API/axios";

import useFetchFunction from "Hooks/useFetchFunction";

import {
  signupApi,
  isUserNameAvailable,
} from "Features/Authentication/Services/authApi";

import { useNavigate } from "react-router-dom";

import {
  ButtonsContainer,
  ErrorParagraph,
  AuthParagraph,
  AuthHeader,
} from "../LogIn/LogIn.styled";

import {
  AuthContainer,
  BackSpan,
  Group,
  ReCAPTCHAContainer,
} from "./SignUpSecondScreen.styled";

const USER_NAME = /^[A-z0-9-_]{3,20}$/;
const PWD_REGEX = /^[A-z0-9-_`~!@#$%^&*()_|+\-=?;:'",.<>]{8,20}$/;

/**
 * SignUpSecondScreen component that is used in Signup Component
 *  @param {boolean} initialFocus Prop to know if the user made at least one focus on the input field or not
 * @param {Function} setInitialFocus Function to set the state of initialFocus
 * @param {Function} setValidUserName Function to set the validity of the userName
 * @param {boolean} validUserName Prop to know if the userName is valid or not
 * @param {boolean} secondScreen Prop to know what screen should be shown (the choose email screen or choose userName and password screen)
 * @param {Function} setSecondScreen Function to set the state of secondScreen
 * @param {boolean} validPassword Prop to know if the password is valid or not
 * @param {Function} setValidPassword Function to set the validity of the password
 * @param {boolean} notRobot Prop to know if the user passed the captcha or not
 * @param {Function} setNotRobot Function to set the state of notRobot
 * @param {number} passwordStrength The strength of the password
 * @param {Function} setPasswordStrength Function to set the strength of the password
 * @param {Object} formFields Object contain the values of input fields
 * @param {Function} setFormFields Function to update the values of input fields
 * @returns {React.Component}  SignUpSecondScreen component that is used in Signup Component
 */

const SignUpSecondScreen = ({
  initialFocus,
  setInitialFocus,
  initialFocus2,
  setInitialFocus2,
  validUserName,
  setValidUserName,
  secondScreen,
  setSecondScreen,
  validPassword,
  setValidPassword,
  notRobot,
  setNotRobot,
  passwordStrength,
  setPasswordStrength,
  formFields,
  setFormFields,
  setModalShowSignUp,
  setModalAfterSignUp,
}) => {
  const auth = useAuth();

  const [data, error, isLoading, dataFetch] = useFetchFunction();
  const [data2, error2, isLoading2, dataFetch2] = useFetchFunction();
  /**
   * state to know what error message should be shown
   */
  const [errMsg, setErrMsg] = useState("");
  const { email, userName, password } = formFields;

  /**
   * some configurations for the captcha
   */
  const grecaptchaObject = window.grecaptcha;
  window.recaptchaOptions = {
    useRecaptchaNet: true,
  };

  /**
   * state to know what error message should be shown
   */
  const [finishedLoading, setFinishedLoading] = useState(false);
  /**
   * state to if the user submitted the form or not
   */
  const [wantSubmit, setWantSubmit] = useState(false);

  /**
   * state to know if we can send request to check the useName or not
   */
  const [canReqAvailableUserName, setCanReqAvailableUserName] = useState(true);
  /**
   * state to set the availability of username
   */
  const [availableUserName, setAvailableUserName] = useState(false);

  const [signupSubmit, setSignupSubmit] = useState(false);

  const navigate = useNavigate();
  /**
   * useEffect for userName field to check if the userName that the user entered is valid or not
   */
  useEffect(() => {
    if (userName.length === 0) {
      setErrMsg("Username must be between 3 and 20 characters");
    }
    setValidUserName(USER_NAME.test(userName));

    if (validUserName && canReqAvailableUserName) {
      setCanReqAvailableUserName(false);

      isUserNameAvailable(dataFetch2, userName);
      if (!error2) {
        setAvailableUserName(true);
      } else {
        setAvailableUserName(false);
      }
      setCanReqAvailableUserName(true);
    }
  }, [userName]);

  useEffect(() => {
    if (signupSubmit) {
      setSignupSubmit(false);
      //console.log("out useEffect", data);

      if (!error && data.token) {
        // console.log("useEffect", data);
        setFinishedLoading(true);
        auth.login(data);
        navigate("/");
        setModalShowSignUp(false);
        setModalAfterSignUp(true);
      }
    }
  }, [data]);
  /**
   * useEffect for password field to check if the userName that the user entered is valid or not
   */
  useEffect(() => {
    if (password.length > 0) {
      setInitialFocus(false);
    }
    setValidPassword(PWD_REGEX.test(password));
    setPasswordStrength(GetPasswordStrength(password));
  }, [password]);

  /**
   * Function to handle the submit of the form of signup
   * @param {*} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (wantSubmit) {
      signupApi(dataFetch, {
        type: "bare email",
        email: email,
        username: "t2_" + userName,
        password: password,
      });
      setSignupSubmit(true);

      setWantSubmit(false);
    }
  };

  /**
   * Function to handle any change on the input field of the login form (check if the userName or the email or the password is valid or not)
   * @param {*} event
   */
  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    if (name === "password") {
      setPasswordStrength(GetPasswordStrength(password));
    }
  };

  /**
   * Function to change userName shown in the userName textField by calling RandomUserName (function in utilities folder)
   */
  const changeUserName = () => {
    setFormFields({ ...formFields, userName: RandomUserName() });
    //setAvailableUserName(true);
    //setValidUserName(true);
  };

  /**
   * Function to handle the captcha and set the state of notRobot to true
   * @param {boolean} value the value of captcha
   */
  const recaptchaHandler = (value) => {
    setNotRobot(true);
  };

  return (
    <>
      {
        <AuthContainer secondScreen={!secondScreen}>
          <BackSpan
            id="backInSignUpFirstScreenModal"
            onClick={() => {
              setSecondScreen(false);
            }}
          >
            <IoMdArrowBack size={20} />
          </BackSpan>

          <br></br>
          <br></br>
          <AuthHeader id="signUpSecondScreenTitleModal">
            Create your username and password
          </AuthHeader>
          <AuthParagraph>
            Reddit is anonymous, so your username is what you’ll go by here.
            Choose wisely—because once you get a name, you can’t change it.
          </AuthParagraph>

          <br></br>

          <form onSubmit={handleSubmit}>
            <Group>
              <FormInput
                data-testid="username"
                id="userNameFieldSignUpModal"
                valid={validUserName && availableUserName && !error2}
                initialFocus={initialFocus}
                label="Username"
                type="text"
                required
                onChange={handleChange}
                name="userName"
                value={userName}
                onFocus={() => {
                  setInitialFocus(false);
                }}
              />
              <span
                id="changeUserNameSignUpModal"
                onClick={() => changeUserName()}
              >
                <TfiReload size={14} />
              </span>
            </Group>

            {/* Show error message if the userName is not valid and the user made a focus on the it's input field */}

            <ErrorParagraph
              data-testid="username-error"
              id="userNameNotValidSignUpModal"
              valid={validUserName || initialFocus}
            >
              {errMsg}
            </ErrorParagraph>

            {error2 && (
              <ErrorParagraph
                id="userNameErrorFromBackendSignUpModal"
                valid={!error2}
              >
                {error2 === "Request failed with status code 404" && (
                  <span>Username is taken</span>
                )}
              </ErrorParagraph>
            )}
            {error && (
              <ErrorParagraph
                id="duplicatedEmail"
                valid={!error}
              >
                {error}
              </ErrorParagraph>
            )}

            {/* {!availableUserName && (
              <ErrorParagraph valid={availableUserName}>
                Username is taken
              </ErrorParagraph>
            )} */}

            {availableUserName && validUserName && !error2 && (
              <ErrorParagraph
                validColor={true}
                valid={!(availableUserName && validUserName)}
              >
                Nice username!
              </ErrorParagraph>
            )}

            <Group>
              <FormInput
                data-testid="password"
                id="passwordFieldSignUpModal"
                valid={validPassword}
                initialFocus={initialFocus2}
                label="Password"
                type="password"
                required
                onChange={handleChange}
                name="password"
                value={password}
                onFocus={() => {
                  setInitialFocus2(false);
                }}
              />
              {!initialFocus2 && (
                <span onClick={() => {}}>
                  <PasswordStrength
                    strength={passwordStrength}
                  ></PasswordStrength>
                </span>
              )}
            </Group>

            {/* Show error message if the password is not valid and the user made a focus on the it's input field */}
            <ErrorParagraph
              data-testid="password-error"
              id="passwordNotValidSignUpModal"
              valid={validPassword || initialFocus2}
            >
              password should contain 8 to 20 characters
            </ErrorParagraph>
            <ButtonsContainer>
              {
                <Button
                  id="signUpButtonModal"
                  disabled={
                    !validUserName ||
                    !validPassword ||
                    !notRobot ||
                    !availableUserName
                  }
                  valid={
                    validUserName &&
                    validPassword &&
                    notRobot &&
                    availableUserName
                  }
                  type="submit"
                  onClick={() => {
                    setWantSubmit(true);
                  }}
                >
                  {!isLoading && <span>Continue</span>}
                  {isLoading  && <LoadingSpinner />}
                </Button>
              }
            </ButtonsContainer>
          </form>

          <ReCAPTCHAContainer validEmail={validUserName && validPassword}>
            <ReCAPTCHA
              id="captchaButtonModal"
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={recaptchaHandler}
              grecaptcha={grecaptchaObject}
            />
          </ReCAPTCHAContainer>
        </AuthContainer>
      }
    </>
  );
};

export default SignUpSecondScreen;
