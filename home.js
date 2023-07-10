import React, { useState, useEffect } from "react";
import axios from "axios";
import { DynamicData } from "./DynamicData";
import { StaticData } from "./StaticData";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
export const Home = ({ fileName, setFileName }) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(fileName);
  }, [fileName]);

  const save = (event) => {
    event.preventDefault();
    const fileInput = event.target.elements.filename; // Ensure 'filename' matches the name attribute of your input element
    const file = fileInput.files[0];
    const name = file.name;
    const formData = new FormData();
    formData.append("file", file);

    try {
      axios.post("http://127.0.0.1:3003/upload", formData).then((res) => {
        alert("File uploaded successfully!");
        console.log("File uploaded successfully!");
      });
      setFileName(name);
      navigate("/dyna");
    } catch (error) {
      console.log("Error uploading file:", error);
      alert("Error uploading file: "); // Display the specific error message returned by the server
    }
  };
  var [info, setInfo] = useState([]);

  useEffect(() => {
    let urladd = "http://127.0.0.1:3003/read?name=employee";
    axios
      .get(urladd)
      .then((res) => {
        setInfo(res.data);
        console.log("static sasys hi");
        console.log(res.data);
        localStorage.setItem("static", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("errorrrrr");
        console.log(err);
      });
  }, []);

  async function deleteEmployee(emp_id) {
    try {
      const response = await axios.delete(
        "http://127.0.0.1:3003/delete?name=employee",
        {
          data: {
            emp_id: emp_id,
          },
        }
      );

      alert("Document deleted successfully from frontend!");
      // console.log('Server response:', response);
    } catch (error) {
      alert("Error deleting document:", error);
    }
    window.location.reload();
  }

  const create = (e) => {
    e.preventDefault();
    navigate("/create");
  };
  const updateFunction = (e) => {
    // e.preventDefault();
    console.log("update");
    navigate("/update");
  };
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = info.slice(firstIndex, lastIndex);
  const npages = Math.ceil(info.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  const prePage = () => {};
  const nextPage = () => {};
  const changeCpage = () => {};
  return (
    <>
      <div>
        <div>Hi,user photo</div>
        <div className="flex justify-between">
          <div className="m-auto">
            <form onSubmit={save}>
              <input type="file" name="filename" />
              <button
                type="submit"
                className="bg-[#E67B73] rounded-lg px-4 py-2 h-10  justify-center text-white"
              >
                Upload
              </button>
            </form>
          </div>
          <div className=" flex mr-16">
            <form onSubmit={create}>
              <input
                className="bg-[#1B72E8] text-white rounded-lg px-4 py-2 h-10  flex justify-center"
                type="submit"
                value="Create"
              />
            </form>
          </div>
        </div>

        <div className="w-[80%] m-auto flex justify-center">
          <table className=" mt-4   border-slate-500 bg-[#F2F6FB] shadow-md p-4">
            <tbody>
              <tr className="bg-blue-100">
                <th className="p-4">employee id</th>
                <th className="p-4">employee name</th>
                <th className="p-4">gender </th>
                <th className="p-4">Band</th>
                <th className="p-4">Buiseness Unit</th>
                <th className="p-4">Division</th>
                <th className="p-4">Delete</th>
                <th className="p-4">Update</th>
              </tr>
              {records.map((row, index) => (
                <tr className="border-b border-gray-300 ">
                  <td className="p-2">{row.emp_id}</td>
                  <td className="p-2">{row.emp_name}</td>
                  <td className="p-2">{row.band}</td>
                  <td className="p-2">{row.gender}</td>
                  <td className="p-2">{row.bu}</td>
                  <td className="p-2">{row.division}</td>
                  <td className="p-2">
                    <button onClick={() => deleteEmployee(row.emp_id)}>
                      <AiOutlineDelete />
                    </button>
                  </td>
                  <td className="p-2">
                    <button onClick={() => updateFunction(row.emp_id)}>
                      <FiEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>
            {numbers.map((n) => (
              <li className={`page-item ${currentPage === n ? "active" : ""}`}>
                <a
                  href="#"
                  className="page-link "
                  onChange={() => changeCpage(n)}
                >
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
