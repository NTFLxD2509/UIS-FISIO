// 🔧 Configuración de la malla curricular
const semestres = [
  {
    nombre: "Semestre 1",
    color: "#5cb85c",
    materias: [
      { nombre: "TALLER DE LENGUAJE", codigo: "23427", creditos: 3, tipo: "G" },
      { nombre: "BIOCIENCIAS I", codigo: "20422", creditos: 6, tipo: "G", desbloquea: ["BIOCIENCIAS II", "MORFOFISIOLOGIA GENERAL"] },
      { nombre: "HISTORIA DE LA CIENCIA", codigo: "22321", creditos: 1, tipo: "G" },
      { nombre: "INTRODUCCION A LA FISIOTERAPIA", codigo: "22322", creditos: 3, tipo: "D", desbloquea: ["HOMBRE Y MOVIMIENTO", "ETICA PROFESIONAL"] },
      { nombre: "CULTURA FISICA Y DEPORTIVA", codigo: "23423", creditos: 1, tipo: "G" },
      { nombre: "VIDA Y CULTURA UNIVERSITARIA", codigo: "24948", creditos: 0, tipo: "G" },
      { nombre: "CONTEXTO I", codigo: "S/C", creditos: 3, tipo: "C", desbloquea: ["CONTEXTO II"] },
    ],
  },
  // ... continúa agregando semestres 2 a 10
];

// 🎯 Cálculo total de créditos al final de la carrera
const totalCreditosCarrera = semestres.flatMap(s => s.materias).reduce((acc, mat) => acc + mat.creditos, 0);

// 💡 Renderizado dinámico
const contenedor = document.getElementById("contenedor-malla");

semestres.forEach((sem, index) => {
  const bloque = document.createElement("section");
  bloque.className = "semestre";
  bloque.style.borderTop = `6px solid ${sem.color}`;

  const titulo = document.createElement("h2");
  titulo.textContent = sem.nombre;
  titulo.style.backgroundColor = sem.color;

  const lista = document.createElement("div");
  let creditosTotales = 0;

  sem.materias.forEach(mat => {
    const boton = document.createElement("div");
    boton.className = "materia";
    boton.innerHTML = `
      <span><strong>${mat.nombre}</strong></span>
      <span>${mat.codigo} (${mat.creditos})</span>
    `;
    boton.dataset.creditos = mat.creditos;
    boton.dataset.nombre = mat.nombre;
    boton.onclick = () => toggleMateria(boton, mat);
    lista.appendChild(boton);
    creditosTotales += mat.creditos;
  });

  // Contadores
  const contadores = document.createElement("div");
  contadores.className = "contadores";
  contadores.innerHTML = `
    <span>Total Créditos: ${creditosTotales}</span>
    <span>Créditos Cursados: <span class="creditos-cursados">0</span></span>
  `;

  bloque.appendChild(titulo);
  bloque.appendChild(lista);
  bloque.appendChild(contadores);
  contenedor.appendChild(bloque);
});

// 🔄 Selección y progresos
function toggleMateria(elem, materia) {
  elem.classList.toggle("seleccionada");
  actualizarProgreso();
}

function actualizarProgreso() {
  const materias = document.querySelectorAll(".materia");
  let sumaCreditos = 0;

  materias.forEach(m => {
    if (m.classList.contains("seleccionada")) {
      sumaCreditos += parseInt(m.dataset.creditos);
    }
  });

  // Actualizar contadores por semestre
  const bloques = document.query
