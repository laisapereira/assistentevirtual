import React, { useEffect, useState } from "react";
import axios from "axios";
import { Department } from "../../types/types";



export default function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
  });
  const [departments, setDepartments] = useState<Department[]>([])
  const [error, setError] = useState("");

  const baseUrl = process.env.REACT_APP_API_DEPARTMENTS || ''
  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        console.log(response.data)
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments", error);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3333/register", {
        ...values, departmentId: values.department});
      console.log(res);
      setError("");
    } catch (err) {
      console.error(err);
      console.log(values);
      setError("Erro ao registrar usuário");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            onChange={(e) =>
              setValues({ ...values, confirmPassword: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="department">Department</label>
          <select
            id="department"
            onChange={(e) =>
              setValues({ ...values, department: e.target.value })
            }
          >
            <option value="">Select</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
