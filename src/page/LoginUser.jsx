import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { CiFacebook } from "react-icons/ci";
import { GrClose } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import "../assets/css/login.css";
import { useState } from "react";
import { auth, provider, providerFacebook } from "../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { loginSchema } from "../schemas/signinValodator";
import Axios  from "axios";
import { API_URL } from "../helper";

const LoginUserPage = (props) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("common")
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const handleLoginGoogle = () => {
    setLogin("firebase");
    signInWithPopup(auth, provider)
      .then((data) => {
        Axios.post(API_URL + '/signin', {
          login,
          email: data._tokenResponse.email,
        }).then(res => {
          console.log(res.data)
        })
      })
      .catch((e) => console.log(e));
  };
  const handleLoginFacebook = () => {
    signInWithPopup(auth, providerFacebook)
      .then((data) => {
        Axios.post(API_URL + '/signin', {
          login,
          email: data._tokenResponse.email,
        }).then(res => {
          console.log(res.data)
        })
      })
      .catch((e) => console.log(e));
  };
  const handleEmailLogin = () => {
    setLogin("common");
    Axios.post(API_URL + '/signin', {
      login,
      email: values.email,
      password: values.password
    }).then(res => {
      console.log(res.data)
    })
  };
  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: handleEmailLogin,
    });
  return (
    <div>
      <Box>
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "white" }}
        >
          <div
            style={{
              textAlign: "left",
            }}
          >
            <p
              style={{
                fontSize: "28px",
                textAlign: "center",
                marginBottom: "30px",
                fontWeight: "600",
              }}
            >
              Sign In
            </p>
            <form onSubmit={handleSubmit}>
              <p>
                Email / Phone <span style={{ color: "red" }}>*</span>
              </p>
              <Input
                focusBorderColor="green.400"
                isInvalid={errors.email && touched.email ? true : false}
                id="email"
                value={values.email}
                style={{ marginTop: "5px" }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <p style={{ color: "red", marginBottom: "5px" }}>
                  {errors.email}
                </p>
              ) : (
                ""
              )}
              <p style={{ marginTop: "10px" }}>
                Password <span style={{ color: "red" }}>*</span>
              </p>
              <InputGroup size="md" style={{ marginTop: "5px" }}>
                <Input
                  focusBorderColor="green.400"
                  isInvalid={
                    errors.password && touched.password ? true : false
                  }
                  id="password"
                  value={values.password}
                  type={show ? "text" : "password"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputRightElement width="3.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && touched.password ? (
                    <p style={{ color: "red", marginBottom: "5px" }}>
                      {errors.password}
                    </p>
                  ) : (
                    ""
                  )}
              <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                <Link
                  className="link"
                  style={{
                    marginTop: "4px",
                    fontWeight: "600",
                  }}
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                variant="solid"
                colorScheme="green"
                style={{
                  width: "100%",
                  marginTop: "15px",
                  marginBottom: "10px",
                }}
                type="submit"
               
              >
                Sign in
              </Button>
            </form>
            <p
              style={{
                width: "100%",
                textAlign: "center",
                borderBottom: "1px solid #000",
                lineHeight: "0.1em",
                margin: "10px 0 20px",
              }}
            >
              <span style={{ background: "#fff", padding: "0 10px" }}>OR</span>
            </p>
            <Button
              leftIcon={<FcGoogle />}
              style={{ width: "100%", marginTop: "5px", marginBottom: "10px" }}
              onClick={handleLoginGoogle}
            >
              Sign in with Google
            </Button>
            <Button
              colorScheme="facebook"
              leftIcon={<CiFacebook size="21" />}
              style={{ width: "100%", marginTop: "5px", marginBottom: "10px" }}
              onClick={handleLoginFacebook}
            >
              Sign in with Facebook
            </Button>
            <div
              style={{
                fontSize: "14px",
                marginTop: "10px",
                paddingBottom: "30px",
              }}
            >
              <p style={{ marginTop: "10px" }}>
                Don't have an account yet?{" "}
                <Link
                  className="link"
                  style={{ fontWeight: "600" }}
                  to="/signup"
                  onClick={() => onclose()}
                >
                  Sign up
                </Link>
              </p>
              <p style={{ marginTop: "10px" }}>
                Already registered but have not got the OTP yet?{" "}
                <Link className="link" style={{ fontWeight: "600" }}>
                  send OTP
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default LoginUserPage;
