import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

const CursoList = () => {
  const [cursos, setCursos] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    axiosClient.get("/cursos")
      .then((res) => setCursos(res.data))
      .catch((error) => console.error(error));
    axiosClient.get("/docentes")
      .then((res) => setDocentes(res.data))
      .catch((error) => console.error(error));
  }, []);

  const obtenerNombreDocente = (id) => {
    const docente = docentes.find((d) => d.id == id);
    return docente ? docente.nombre : "Desconocido"
  }


  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Gestión de Cursos</h1>
      <input type="text" placeholder="Buscar..." className="border p-2 mt-2"
        onChange={(e) => setFiltro(e.target.value)} />
      <ul>
        {cursos.filter(curso => curso.nombre.toLowerCase().includes(filtro.toLowerCase()))
          .map((curso) => (
            <li key={curso.id} className="border p-4 my-2 rounded shadow-lg bg-white">
              <h2 className="text-xl font-semibold">{curso.nombre}</h2>
              <p className="text-gray-600">{curso.descripcion}</p>
              <p><strong>Duración:</strong> {curso.duracion} semanas</p>
              <p><strong>Precio:</strong> ${curso.precio}</p>
              <p><strong>Fecha de Inicio:</strong> {new Date(curso.fechaInicio).toLocaleDateString()}</p>
              <p><strong>Docente:</strong> {obtenerNombreDocente(curso.docenteId)}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CursoList;
