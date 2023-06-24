import { Button, TextField } from "@mui/material";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  getDocs,
} from "@firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../../firebase";
import { EmployeeContext } from "./EmployeeContext";
import axios from "../../../lib/axios";

export default function EmployeeForm() {
  // snackbar
  const { showAlert, employee, setEmployee } = useContext(EmployeeContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [fireData, setFireData] = useState([]);
  const collectionRef = collection(db, "employees");

  useEffect(() => {
    getData();
  }, []);

  // button submit
  const addData = (event) => {
    event.preventDefault();
    if (employee?.hasOwnProperty("timestamp")) {
      const docRef = doc(db, "employees", employee.id);
      const employeeUpdated = { ...employee, timestamp: serverTimestamp() };
      updateDoc(docRef, employeeUpdated);
      setEmployee({ name: "", email: "", jabatan: "", telepon: "" });
      showAlert(
        "success",
        `Employee with id ${docRef.id} is updated succesfully`
      );
      axios.put(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/api/employees/${timestamp}`,
        {
          ...employee,
        }
      );
    } else {
      addDoc(
        collectionRef,
        {
          ...employee,
          timestamp: serverTimestamp(),
        },
        setEmployee({ name: "", email: "", jabatan: "", telepon: "" }),
        showAlert("success", `Employee is added succesfully`)
      ).then(() => {
        axios
          .post("http://localhost:8000/api/employees", {
            ...employee,
          })
          .then((response) => {
            showAlert("success", `Employee is succesfully added to MySQL`);
            getData();
            setName("");
            setEmail("");
            setTelepon("");
            setJabatan("");
          })
          .catch((err) => {
            console.error(err);
            showAlert("error", `Employee can't be added to MySQL`);
          });
      });
    }
  };

  const getData = async () => {
    await getDocs(collectionRef).then((response) => {
      setFireData(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  };

  // detect input area
  const inputAreaRef = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        console.log("Outside input area");
        setEmployee({ name: "", email: "", jabatan: "", telepon: "" });
      } else {
        console.log("Inside input area");
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  return (
    <div ref={inputAreaRef}>
      <form method="POST" onSubmit={addData}>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          name="name"
          id="name"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          id="email"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
        />
        <TextField
          fullWidth
          label="Telepon"
          margin="normal"
          name="telepon"
          id="telepon"
          value={employee.telepon}
          onChange={(e) =>
            setEmployee({ ...employee, telepon: e.target.value })
          }
        />
        <TextField
          fullWidth
          label="Jabatan"
          margin="normal"
          name="jabatan"
          id="jabatan"
          value={employee.jabatan}
          onChange={(e) =>
            setEmployee({ ...employee, jabatan: e.target.value })
          }
        />
        <Button
          onClick={addData}
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
        >
          {employee.hasOwnProperty("timestamp")
            ? "Update Employee"
            : "Add a new Employee"}
        </Button>
      </form>
    </div>
  );
}
