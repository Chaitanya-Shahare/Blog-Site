import { useState, useEffect, useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";
import { app } from "../FirebaseConfiguration";
import Logo from "../assets/always-first-logo.svg";

export const Login = () => {
  const [pw, setPw] = useState("");
  const [user, setUser] = useState("");
  const [ans, setAns] = useState("");

  const hUser = (event) => {
    setUser(event.target.value);
  };
  const hPw = (event) => {
    setPw(event.target.value);
  };
  const nav = useNavigate("");
  const rMail = useRef();
  useEffect(() => {
    rMail.current.focus();
    const user = localStorage.getItem("user");
    if (user != null) {
      nav("/staticgraph");
      setAns(user);
    }
  }, []);
  const handleLogin = (event) => {
    event.preventDefault();

    const auth = getAuth();

    signInWithEmailAndPassword(auth, user, pw)
      .then((res) => {
        localStorage.setItem("user", user);
        localStorage.setItem("userEmail", user);
        localStorage.setItem("loginType", "email-password");
        nav("/staticgraph");
      })
      .catch((err) => alert("issue " + err));
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
          <h1 className="font-bold p-3 text-xl mb-2">Log In</h1>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="Email"
                ref={rMail}
                onChange={hUser}
                className="border border-black rounded-lg  hover:bg-blue-100 text-left p-2 mb-4"
              />

              <input
                type="password"
                placeholder="Password"
                onChange={hPw}
                className="border border-black rounded-lg text-left p-2 mb-4 hover:bg-blue-100"
              />

              <input
                type="submit"
                value="Login"
                className="border border-black rounded-lg text-center py-2 px-9 mx-auto  bg-[#1B72E8] text-white  hover:bg-black mb-4 "
              />
              <h3 className="mb-4">Or </h3>

              <button
                onClick={googleLogin}
                className="darkmode-ignore border rounded-lg text-center border-black p-1 hover:bg-blue-100 mb-4 "
              >
                <AiOutlineGoogle size={25} className="inline mr-3 " />
              </button>

              <h2 className="m-8">
                Don't have an account?{" "}
                <Link className="text-[#1B72E8] underline " to="/signup">
                  signup.
                </Link>
              </h2>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
