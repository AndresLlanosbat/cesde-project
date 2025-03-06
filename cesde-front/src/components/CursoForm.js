import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

const CursoForm = () => {
  const [docentes, setDocentes] = useState([]);
  const [curso, setCurso] = useState({ nombre: "", duracion: 0, precio: 0, fechaInicio: null, docenteId: null });
 
  const handleChange = (e) => {
    setCurso({ ...curso, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient.post("/cursos", curso)
      .then(() => alert("Curso agregado"))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axiosClient.get("/docentes")
     .then((res) => setDocentes(res.data))
     .catch((error) => console.error(error));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="p-5 border">
      <input name="nombre" placeholder="Nombre" onChange={handleChange} className="border p-2" />
      <input name="duracion" placeholder="Duración" onChange={handleChange} className="border p-2" />
      <input name="precio" placeholder="Precio" onChange={handleChange} className="border p-2" />
      <input type="date" name="fechaInicio" onChange={handleChange} className="border p-2" />
      <select name="docenteId" id="docenteId" onChange={handleChange} className="border p-2">
        <option selected disabled>Seleccione un docente</option>
        {docentes.map((docente) => (
          <option key={docente.id} value={docente.id}>{docente.nombre}</option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2">Guardar</button>
    </form>
  );
};

export default CursoForm;
