const DATA = {
  mi2: {
    title: "Matemática Intermedia 2",
    units: [
      {id:1, name:"Rectas, Planos y Proyecciones Ortogonales"},
      {id:2, name:"Cuatro Subespacios Fundamentales"},
      {id:3, name:"Complementos Ortogonales y Bases"},
      {id:4, name:"Mínimos Cuadrados y Ajuste"},
      {id:5, name:"Ortogonalidad, Gram-Schmidt, Q y Proyecciones"},
      {id:6, name:"Determinantes"},
      {id:7, name:"Autovalores y Autovectores"},
      {id:8, name:"Diagonalización A = S D S^{-1}"},
      {id:9, name:"Matrices Simétricas y A = Q D Q^T"},
      {id:10, name:"Repaso Mixto Estilo Reposición"}
    ],
    questions: {}
  },
  mi3: {
    title: "Matemática Intermedia 3",
    units: [
      {id:1, name:"Integrales Dobles y Cambio de Orden"},
      {id:2, name:"Integrales Dobles en Coordenadas Polares"},
      {id:3, name:"Integrales Triples"},
      {id:4, name:"Integrales Triples en Cilíndricas"},
      {id:5, name:"Integrales Triples en Esféricas"},
      {id:6, name:"Integrales de Línea Escalares y Vectoriales"},
      {id:7, name:"Campos Conservativos, Potencial e Independencia"},
      {id:8, name:"Teorema de Green y Cálculo de Área"},
      {id:9, name:"Teorema de Stokes"},
      {id:10, name:"Teorema de la Divergencia (Gauss) y Repaso Mixto"}
    ],
    questions: {}
  }
};

function loadCourse(c){
  fetch('data/'+c+'/index.json').then(r=>r.json()).then(list=>{
    DATA[c].units=list;
    list.forEach(u=>{
      fetch('data/'+c+'/u'+u.id+'.json').then(r=>r.json()).then(j=>{
        DATA[c].questions[u.id]=j.questions||[];
      });
    });
  });
}

loadCourse('mi2'); loadCourse('mi3');
