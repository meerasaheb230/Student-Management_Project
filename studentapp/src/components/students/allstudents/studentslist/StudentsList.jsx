import { useState ,useEffect} from "react";


export const StudentsList=()=>{
const [student,setStudent]=useState([]);

useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:3001/students", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const students = response.data.data.students;
        setStudent(students);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

    return (
        <div className="students-list">

        </div>
    )
}