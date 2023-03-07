import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { CiFacebook } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { auth, provider, providerFacebook } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import "react-phone-input-2/lib/style.css";
import { API_URL } from "../helper";
import Axios from "axios";
import { useFormik } from "formik";
import { basicSchema } from "../schemas/signupValidator";
import LoginPanelPage from "./LoginPanel";

const SignupUserPage = (props) => {
  const [firebasePass, setFirebasePass] = useState("!@firebase_rent@haven@!");
  const [show, setShow] = useState(false);
  const [alerts, setAlert] = useState("");
  const [normalReg, setReg] = useState("common");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [providers, setProvider] = useState("none");
  const handleClick = () => setShow(!show);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLoginGoogle = () => {
    setGoogleLoading(true);
    signInWithPopup(auth, provider)
      .then((data) => {
        Axios.post(API_URL + "/signup/user", {
          email: data._tokenResponse.email,
        }).then((res) => {
          if (res.data.success == false) {
            setAlert(
              <Alert status="error" style={{ marginBottom: "5px" }}>
                <AlertIcon />
                The email had already been registered
              </Alert>
            );
            setGoogleLoading(false);
          } else {
            setFieldValue("name", data._tokenResponse.displayName);
            setFieldValue("email", data._tokenResponse.email);
            setReg("firebase");
            setAlert(
              <Alert status="info" style={{ marginBottom: "5px" }}>
                <AlertIcon />
                You are almost there, please complete the form to finish the
                registration!
              </Alert>
            );
            setGoogleLoading(false);
          }
        });
      })
      .catch((e) => {
        setAlert(
          <Alert status="error" style={{ marginBottom: "5px" }}>
            <AlertIcon />
            The email had already been registered
          </Alert>
        );
        setGoogleLoading(false);
      });
  };
  const handleLoginFacebook = () => {
    setFacebookLoading(true);
    signInWithPopup(auth, providerFacebook)
      .then((data) => {
        Axios.post(API_URL + "/signup/user", {
          email: data._tokenResponse.email,
        }).then((res) => {
          if (res.data.success == false) {
            setAlert(
              <Alert status="error" style={{ marginBottom: "5px" }}>
                <AlertIcon />
                The email had already been registered
              </Alert>
            );
            setFacebookLoading(false);
          } else {
            setFieldValue("name", data._tokenResponse.displayName);
            setFieldValue("email", data._tokenResponse.email);
            setReg("firebase");
            setAlert(
              <Alert status="info" style={{ marginBottom: "5px" }}>
                <AlertIcon />
                You are almost there, please complete the form to finish the
                registration!
              </Alert>
            );
            setFacebookLoading(false);
          }
        });
      })
      .catch((e) => {
        setAlert(
          <Alert status="error" style={{ marginBottom: "5px" }}>
            <AlertIcon />
            The email had already been registered
          </Alert>
        );
        setFacebookLoading(false);
      });
  };
  const registerHandler = () => {
    setSignupLoading(true);
    if (normalReg == "firebase") {
      Axios.post(API_URL + "/signup/new-user", {
        name: values.name,
        email: values.email,
        phone: values.phone,
        regis: normalReg,
      })
        .then((res) => {
          alert(res.data.message);
          setSignupLoading(false);
        })
        .catch((e) => setSignupLoading(false));
    } else {
      Axios.post(API_URL + "/signup/new-user", {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        regis: normalReg,
      })
        .then((res) => {
          alert(res.data.message);
          setSignupLoading(false);
        })
        .catch((e) => setSignupLoading(false));
    }
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    validationSchema: basicSchema,
    onSubmit: registerHandler,
  });
  return (
    <div>
      <Box>
        <Box
          rounded="md"
          style={{
            height: "100%",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              textAlign: "left",
              margin: "0px 30px 0",
              paddingTop: "25px",
            }}
          >
            <p
              className="fw-bold"
              style={{
                fontSize: "28px",
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              Sign Up
            </p>
            <div style={{ transition: "all 0.2s ease-in-out" }}>{alerts}</div>
            <form onSubmit={handleSubmit}>
              <p>
                Name <span style={{ color: "red" }}>*</span>
              </p>
              <FormControl isRequired>
                <Input
                  focusBorderColor="green.400"
                  isInvalid={errors.name && touched.name ? true : false}
                  id="name"
                  style={{ marginTop: "5px" }}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              {errors.name && touched.name ? (
                <p style={{ color: "red", marginBottom: "5px" }}>
                  {errors.name}
                </p>
              ) : (
                ""
              )}
              <p>
                Email <span style={{ color: "red" }}>*</span>
              </p>
              <FormControl isRequired>
                <Input
                  focusBorderColor="green.400"
                  isInvalid={errors.email && touched.email ? true : false}
                  id="email"
                  style={{ marginTop: "5px" }}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              {errors.email && touched.email ? (
                <p style={{ color: "red", marginBottom: "5px" }}>
                  {errors.email}
                </p>
              ) : (
                ""
              )}
              <p>
                Phone <span style={{ color: "red" }}>*</span>
              </p>
              <FormControl isRequired>
                <Input
                  focusBorderColor="green.400"
                  isInvalid={errors.phone && touched.phone ? true : false}
                  id="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              {errors.phone && touched.phone ? (
                <p style={{ color: "red", marginBottom: "5px" }}>
                  {errors.phone}
                </p>
              ) : (
                ""
              )}
              {normalReg === "common" ? (
                <div>
                  <p style={{ marginTop: "10px" }}>
                    Password <span style={{ color: "red" }}>*</span>
                  </p>
                  <FormControl isRequired>
                    <InputGroup size="md" style={{ marginTop: "5px" }}>
                      <Input
                        focusBorderColor="green.400"
                        isInvalid={
                          errors.password && touched.password ? true : false
                        }
                        id="password"
                        type={show ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <InputRightElement width="3.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  {errors.password && touched.password ? (
                    <p style={{ color: "red", marginBottom: "5px" }}>
                      {errors.password}
                    </p>
                  ) : (
                    ""
                  )}
                  <p style={{ marginTop: "10px" }}>
                    Confirm password <span style={{ color: "red" }}>*</span>
                  </p>
                  <FormControl isRequired>
                    <InputGroup size="md" style={{ marginTop: "5px" }}>
                      <Input
                        focusBorderColor="green.400"
                        isInvalid={
                          errors.confirmPassword && touched.confirmPassword
                            ? true
                            : false
                        }
                        id="confirmPassword"
                        type={show ? "text" : "password"}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <InputRightElement width="3.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p style={{ color: "red", marginBottom: "5px" }}>
                      {errors.confirmPassword}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}

              <Button
                isLoading={signupLoading}
                variant="solid"
                colorScheme="green"
                style={{
                  width: "100%",
                  marginTop: "15px",
                  marginBottom: "10px",
                }}
                type="submit"
              >
                Sign up
              </Button>
            </form>
            {normalReg === "common" ? (
              <div>
                <p
                  style={{
                    width: "100%",
                    textAlign: "center",
                    borderBottom: "1px solid #000",
                    lineHeight: "0.1em",
                    margin: "10px 0 20px",
                  }}
                >
                  <span style={{ background: "#fff", padding: "0 10px" }}>
                    OR
                  </span>
                </p>
                <Button
                  isLoading={googleLoading}
                  leftIcon={<FcGoogle />}
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "10px",
                  }}
                  onClick={handleLoginGoogle}
                >
                  Sign up with Google
                </Button>
                <Button
                  isLoading={facebookLoading}
                  colorScheme="facebook"
                  leftIcon={<CiFacebook size="21" />}
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "10px",
                  }}
                  onClick={handleLoginFacebook}
                >
                  Sign up with Facebook
                </Button>
              </div>
            ) : (
              ""
            )}

            <div
              style={{
                fontSize: "14px",
                marginTop: "10px",
                paddingBottom: "30px",
              }}
            >
              <p style={{ marginTop: "10px" }}>
                Already have an account?{" "}
                <Link
                  style={{ fontWeight: "600" }}
                  onClick={() => {
                    onOpen();
                  }}
                >
                  Sign in
                </Link>
              </p>
            </div>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
              <ModalOverlay backdropFilter="blur(10px)" />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody><LoginPanelPage /></ModalBody>
              </ModalContent>
            </Modal>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default SignupUserPage;
