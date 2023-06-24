import { Button, TextField } from "@mui/material";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  getDocs,
  doc,
} from "@firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../../firebase";
import { EmployeeContext } from "./EmployeeContext";
import axios from "../../../lib/axios";
import { useRouter } from "next/router";

const EmployeeForm = () => {
  // snackbar
  const { showAlert, employee, setEmployee } = useContext(EmployeeContext);

  useEffect(() => {
    getData();
  }, []);

  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [fireData, setFireData] = useState();

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
    } else {
      const collectionRef = collection(db, "employees");
      const docRef = addDoc(collectionRef, {
        ...employee,
        timestamp: serverTimestamp(),
      },
      setEmployee({ name: "", email: "", jabatan: "", telepon: "" }),
        showAlert(
          "success",
          `Employee is added succesfully`
        ))
      .then(() => {
        axios
        .post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/employees`, {
            ...employee
        })
        .then((response) => {
            alert("Berhasil Menambahkan Data");
            getData();
            setName("");
            setEmail("");
            setTelepon("");
            setJabatan("");
          })
          .catch((error) => {
            console.log("error", error);
            alert("Gagal menambahkan data ke MySQL");
          });
      })
      .catch((err) => {
        console.error(err);
        alert('Gagal menambahkan data');
      });;
    }
  };

  const getData = async () => {
    const collectionRef = collection(db, "employees");
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
      <form onSubmit={addData} method="POST">
        {/* <pre>{JSON.stringify(employee, null, '\t')}</pre> */}
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
};

export default EmployeeForm;
