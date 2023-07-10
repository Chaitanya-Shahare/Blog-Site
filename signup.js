import React from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Logo from "../assets/always-first-logo.svg";

export const SignUp = () => {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const hUser = (event) => {
    setUser(event.target.value);
  };
  const hPw1 = (event) => {
    setPw1(event.target.value);
  };
  const hPw2 = (event) => {
    setPw2(event.target.value);
  };
  const rMail = useRef();

  useEffect(() => {
    rMail.current.focus();
  }, []);

  const save = (event) => {
    event.preventDefault();
    if (pw1 == pw2) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user, pw1)
        .then((res) => {
          alert("User registered!");
          nav("/login");
        })
        .catch((err) => alert("issue " + err));
    } else {
      alert("passwords dont match");
    }
  };
  const googleLogin = (event) => {
    event.preventDefault();

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(result);
        localStorage.setItem("googleUserInfo", JSON.stringify(result.user));
        localStorage.setItem("userEmail", result.user.email);
        localStorage.setItem("user", result.user.email);
        setUser(result.user.email);
        localStorage.setItem("loginType", "google");
        nav("/staticgraph");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        rMail.current.focus();
      });
  };
  return (
    <>
      <div className="bg-[#FFF] flex items-center justify-center h-screen ">
        <div className="rectangle-ui rectangle-ui--1"></div>
        <div className="rectangle-ui rectangle-ui--2"></div>
        <div className="rectangle-ui rectangle-ui--3"></div>
        <div className="rectangle-ui rectangle-ui--4"></div>

        <div className="bg-[#F2F6FB] max-w-fit  shadow-md border p-4 rounded-lg">
          <img src={Logo} className="pt-8 -mb-2" />
          <h1 className="font-bold p-3 text-xl mb-2">Sign Up</h1>

          <form onSubmit={save}>
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="Email"
                required
                ref={rMail}
                onChange={hUser}
                className="border border-black rounded-lg  hover:bg-blue-100 text-left p-2 mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={hPw1}
                className="border border-black rounded-lg  hover:bg-blue-100 text-left p-2 mb-4"
              />
              <input
                type="password"
                placeholder="Confirm password"
                required
                onChange={hPw2}
                className="border border-black rounded-lg  hover:bg-blue-100 text-left p-2 mb-4"
              />
              <input
                type="submit"
                value="Sign Up"
                className="border rounded-lg text-center py-2 px-9 mx-auto  bg-[#1B72E8] text-white  hover:bg-black mb-4 "
              />
              <h3 className="mb-4">Or</h3>
              <button
                onClick={googleLogin}
                className=" border rounded-lg text-center border-black p-1 hover:bg-blue-100 mb-4 "
              >
                <AiOutlineGoogle size={25} className="inline mr-3 " />
              </button>

              <h2 className="m-8">
                Already have an account?{" "}
                <Link className="text-[#1B72E8] underline " to="/login">
                  login
                </Link>
              </h2>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
