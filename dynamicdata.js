import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const DynamicData = ({ fileName, setFileName }) => {
  const navigate = useNavigate();

  const [info, setInfo] = useState([]);

  useEffect(() => {
    const show = () => {
      console.log(fileName, "fron dyna");
      let urladd = `http://127.0.0.1:3003/read?name=${fileName}`;
      axios
        .get(urladd)
        .then((res) => {
          setInfo(res.data);
        })
        .catch((err) => {
          console.log("errorrrrr");
          console.log(err);
        });
    };
    show();
  }, []);
  const [savedData, setSavedData] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("uploaded_data"));
    if (data === null) {
      localStorage.setItem("uploaded_data", JSON.stringify(info));
    } else {
      setSavedData(JSON.parse(localStorage.getItem("uploaded_data")));
    }
  }, [info]);
  async function deleteEmployee(emp_id) {
    try {
      // setDeletedItems([...deletedItems, emp_id]);
      const response = await axios.delete(
        `http://127.0.0.1:3003/delete?name=${fileName}`,
        {
          data: {
            emp_id: emp_id,
          },
        }
      );
      // console.log('Document deleted successfully!');
      // console.log('Server response:', response);

      const data = JSON.parse(localStorage.getItem("uploaded_data"));
      console.log(data);
      const entry = data.find((item) => item.emp_id === emp_id);

      console.log(entry);
      // Filter the array based on the emp_id
      var updatedArray = data.filter(function (row) {
        return row.emp_id != emp_id;
      });
      console.log(updatedArray);
      localStorage.setItem("new_data", JSON.stringify(updatedArray));
      console.log(JSON.parse(localStorage.getItem("uploaded_data")));
      window.location.reload();

      // Save the updated array back to localStorage
      alert("deleted");
    } catch (error) {
      console.log("Error deleting document:", error);
    }
  }
  const create = (e) => {
    e.preventDefault();
    navigate("/create");
  };
  const updateFunction = (e) => {
    console.log("update");
    navigate("/update");
  };

  // const data=JSON.parse(localStorage.getItem("uploaded_data"))    ;
  console.log(savedData);
  return (
    <>
      <div>DynamicData</div>
      {/* <form onSubmit={create}>
                <input type='submit' value='Add' />
            </form> */}
      <table border="4" style={{ width: "70%" }}>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>gender</th>
          <th>Delete</th>
          <th>Update</th>
        </tr>
        {savedData === null
          ? info.map((e) => (
              <tr style={{ textAlign: "center" }}>
                <td>{e.emp_id}</td>
                <td>{e.emp_name}</td>
                <td>{e.gender}</td>
                <button onClick={() => deleteEmployee(e.emp_id)}>delete</button>
                <button onClick={() => updateFunction(e.emp_id)}>Update</button>
              </tr>
            ))
          : savedData.map((e) => (
              <tr style={{ textAlign: "center" }}>
                <td>{e.emp_id}</td>
                <td>{e.emp_name}</td>
                <td>{e.gender}</td>
                {/* <button onClick={() => deleteEmployee(e.emp_id)}>delete</button> */}
                <button onClick={() => updateFunction(e.emp_id)}>Update</button>
              </tr>
            ))}
      </table>
    </>
  );
};
/* saveData.filter(item => item.emp_id && !deletedItems.includes(item.emp_id)) */
