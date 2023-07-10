import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
// import "/Users/ritikahotwani/Documents/NOMURA_SOLUTION/testing/trial/src/bg_pattern.css";
import "./ForgotPassword.css";
function ForgotPassword() {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [ans, setAns] = useState("");

  useEffect(() => {
    rMail.current.focus();
    const user = localStorage.getItem("user");
    if (user != null) {
      nav("/staticgraph");
    }
  }, []);
  const hUser = (event) => {
    setUser(event.target.value);
  };

  const rMail = useRef();
  const save = (event) => {
    event.preventDefault();

    const auth = getAuth();
    sendPasswordResetEmail(auth, user)
      .then((res) => {
        alert("Check You Mail");
        nav("/login");
        rMail.current.focus();
      })
      .catch((err) => setAns("issue " + err));
  };

  return (
    <>
      <div className="bg-[#FFF] flex items-center justify-center h-screen ">
        <div className="bottom-container">
          <div className="bg"></div>
        </div>

        <div className=" bg-[#F2F6FB] max-w-fit rounded-md min-w-[25%] min-h-[38%] shadow-md border p-4">
          <h1 className="font-bold p-3 text-2xl mb-2 max-w-sm ">
            Forgot Password
          </h1>
          <form onSubmit={save}>
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="Email"
                required
                ref={rMail}
                onChange={hUser}
                className=" border border-black rounded-lg  hover:bg-blue-100 text-left p-2 mb-7 mt-2"
              />

              <input
                type="submit"
                value="Reset"
                className="border w-[60%] border-black rounded-lg text-center py-2 px-9 mx-auto mt-5 bg-[#1B72E8] text-white text-semibold hover:bg-black"
              />
            </div>
          </form>
        </div>
      </div>
      <h1>{ans}</h1>
    </>
  );
}
export default ForgotPassword;
