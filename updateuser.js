import React from "react";
import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const UpdateUser = ({ fileName, setFileName }) => {
  const [emp_name, setEmp_Name] = useState("");
  const [emp_id, setEmp_Id] = useState("");
  const [gender_id, setGender_Id] = useState("");
  const [bu_id, setBu_Id] = useState("");
  const [termination_id, setTerminate_Id] = useState("");
  const [band_id, setBand_Id] = useState("");
  const [band, setBand] = useState("");
  const [gender, setGender] = useState("");
  const [joining_date, setJoining_Date] = useState("");
  const [terminate_reason, setTerminate_Reason] = useState("");
  const [working_status, setWorking_Status] = useState("");
  const [bu, setBu] = useState("");
  const [manager_name, setManager_Name] = useState("");
  const [manager_id, setManager_Id] = useState("");
  const [hiring_source, setHiring_Source] = useState("");
  const [division, setDivision] = useState("");

  const rEmpName = useRef();
  const hEmp_Name = (event) => {
    setEmp_Name(event.target.value);
  };
  const hEmp_Id = (event) => {
    setEmp_Id(event.target.value);
  };
  const hGender_Id = (event) => {
    setGender_Id(event.target.value);
  };
  const hBu_Id = (event) => {
    setBu_Id(event.target.value);
  };
  const hTermination_Id = (event) => {
    setTerminate_Id(event.target.value);
  };
  const hBand_Id = (event) => {
    setBand_Id(event.target.value);
  };
  const hBand = (event) => {
    setBand(event.target.value);
  };
  const hGender = (event) => {
    setGender(event.target.value);
  };
  const hJoining_Date = (event) => {
    setJoining_Date(event.target.value);
  };
  const hTerminate_Reason = (event) => {
    setTerminate_Reason(event.target.value);
  };
  const hWorking_Status = (event) => {
    setWorking_Status(event.target.value);
  };
  const hBu = (event) => {
    setBu(event.target.value);
  };
  const hManager_Name = (event) => {
    setManager_Name(event.target.value);
  };
  const hManager_Id = (event) => {
    setManager_Id(event.target.value);
  };
  const hHiring_Source = (event) => {
    setHiring_Source(event.target.value);
  };
  const hDivision = (event) => {
    setDivision(event.target.value);
  };
  const navigate = useNavigate();
  const updateuser = (event) => {
    event.preventDefault();
    fileName == undefined
      ? // let urladd = "http://127.0.0.1:3309/update";
        axios
          .put("http://127.0.0.1:3003/update?name=employee", {
            emp_name,
            emp_id,
            gender_id,
            bu_id,
            termination_id,
            band_id,
            band,
            gender,
            joining_date,
            terminate_reason,
            working_status,
            bu,
            manager_name,
            manager_id,
            hiring_source,
            division,
          })
          .then((res) => {
            // if (res.data.modifiedCount==1) {
            //     alert("record updated");
            // }
            // else {
            //     alert(emp_id + " does not exists");
            //     // setMarks("");
            //     // setName("");
            //     // setRno("");
            //     // rName.current.focus();
            // }
            console.log("entered");
          })
          .catch((err) => console.log(err))
      : axios
          .put(`http://127.0.0.1:3003/create?name=${fileName}`, {
            emp_name,
            emp_id,
            gender_id,
            bu_id,
            termination_id,
            band_id,
            band,
            gender,
            joining_date,
            terminate_reason,
            working_status,
            bu,
            manager_name,
            manager_id,
            hiring_source,
            division,
          })
          .then((res) => {
            console.log("entered");
          })
          .catch((err) => console.log(err));
  };
  return (
    <>
      <div>UpdateUser</div>
      <form onSubmit={updateuser}>
        <input
          type="text"
          placeholder="Name"
          value={emp_name}
          ref={rEmpName}
          onChange={hEmp_Name}
        />
        <input
          type="number"
          placeholder="employee id"
          value={emp_id}
          onChange={hEmp_Id}
        />
        <input
          type="number"
          placeholder="gender id"
          value={gender_id}
          onChange={hGender_Id}
        />
        <input
          type="number"
          placeholder="bu id"
          value={bu_id}
          onChange={hBu_Id}
        />
        <input
          type="number"
          placeholder="termination id"
          value={termination_id}
          onChange={hTermination_Id}
        />
        <input
          type="number"
          placeholder="band id"
          value={band_id}
          onChange={hBand_Id}
        />
        <input type="text" placeholder="Band" value={band} onChange={hBand} />
        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={hGender}
        />
        <input
          type="date"
          placeholder="joining date"
          value={joining_date}
          onChange={hJoining_Date}
        />
        <input
          type="text"
          placeholder="Terminate reason"
          value={terminate_reason}
          onChange={hTerminate_Reason}
        />
        <input
          type="text"
          placeholder="working status"
          value={working_status}
          onChange={hWorking_Status}
        />
        <input type="text" placeholder="bu" value={bu} onChange={hBu} />
        <input
          type="text"
          placeholder="manager name"
          value={manager_name}
          onChange={hManager_Name}
        />
        <input
          type="number"
          placeholder="manager id"
          value={manager_id}
          onChange={hManager_Id}
        />
        <input
          type="text"
          placeholder="hiring source"
          value={hiring_source}
          onChange={hHiring_Source}
        />
        <input
          type="text"
          placeholder="division"
          value={division}
          onChange={hDivision}
        />
        <input type="submit" value="Create" />
      </form>
    </>
  );
};
