import { useState } from "react";
import { getAuth, updatePassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function ChangePassword() {
  const nav = useNavigate();
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [ans, setAns] = useState("");
  const rFocuspw = useRef();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user == null) {
      nav("/login");
    }
  }, []);
  const hPw1 = (event) => {
    setPw1(event.target.value);
  };
  const hPw2 = (event) => {
    setPw2(event.target.value);
  };

  useEffect(() => {
    rFocuspw.current.focus();
  }, []);

  const save = (event) => {
    event.preventDefault();
    if (pw1 == pw2) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        updatePassword(user, pw1)
          .then((res) => {
            localStorage.clear();
            nav("/login");
          })
          .catch((err) => setAns("issue " + err));
        rFocuspw.current.focus();
      });
    } else {
      alert("passwords don't match");
    }
  };
  return (
    <>
      <div className="bg-[#FFF] flex items-center justify-center h-screen ">
        <div className=" bg-[#F2F6FB] max-w-fit rounded-md min-w-[25%] min-h-[40%] shadow-md border p-4">
          <h1 className="font-bold p-3 text-2xl mb-2 max-w-sm">
            Change Password
          </h1>
          <form onSubmit={save}>
            <div className="flex flex-col">
              <input
                type="password"
                placeholder="New password"
                required
                ref={rFocuspw}
                className=" border border-black rounded-lg  hover:bg-blue-100 text-left p-2 mb-7"
                onChange={hPw1}
              />

              <input
                type="password"
                placeholder="Confirm password"
                required
                onChange={hPw2}
                className="border border-black rounded-lg  hover:bg-blue-100 text-left p-2 mb-7"
              />

              <input
                type="submit"
                value="Reset"
                className="border w-[60%] border-black rounded-lg text-center py-2 px-9 mx-auto mt-5 bg-[#1B72E8] text-white text-semibold hover:bg-black mb-4  "
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default ChangePassword;
