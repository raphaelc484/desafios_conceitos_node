const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
    const {title,url,techs,likes} = request.body

    const project = {id:uuid(),title,url,techs,likes:0} 

    //const project = {id:uuid(),title:"Desafio Node.js",url:"https://github.com/raphaelc484/desafios_conceitos_node",techs:["Node.js","express","uuidv4"],likes:0} 

    repositories.push(project)
    
    return response.json(project)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const {title,url,techs,likes} = request.body

  const project_Index = repositories.findIndex(project => project.id ===id)

  if (project_Index < 0) {
    return response.status(400).json({error:"ERRRRRROOOOOO!!!!"})
}
  const project = {
    id,
    title,
    url,
    techs,
    likes:repositories[project_Index].likes
  }

  // const project = {
  //     id,
  //     title:"Desafio Node.js - UPDATE",
  //     url:"https://github.com/raphaelc484/desafios_conceitos_node",
  //     techs:["Node.js","express","uuidv4"],
  //     likes:repositories[project_Index].likes
  //   } 

  repositories[project_Index] = project

  return response.json(project)

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params

  const project_Index = repositories.findIndex(project => project.id ===id)

  if (project_Index < 0) {
    return response.status(400).json({error:"Não vai rolar"})
}

repositories.splice(project_Index,1)

return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const project_Index = repositories.findIndex(project => project.id ===id)

  if (project_Index < 0) {
    return response.status(400).json({error:"ARRUMA!!!!"})
}

  const project = {
    id:repositories[project_Index].id,
    title:repositories[project_Index].title,
    url:repositories[project_Index].url,
    techs:repositories[project_Index].techs,
    likes:repositories[project_Index].likes + 1
  }

  repositories[project_Index] = project

  return response.json(project)

});

module.exports = app;
