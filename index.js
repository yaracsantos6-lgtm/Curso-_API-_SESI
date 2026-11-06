const express = require("express")
const mysql = require("mysql2/promise")
const app = express()

app.use(express.json())

// Banco de dados
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3307,
    database: "escola"
})

// Listar professores
app.get("/professores", async (req, res) => {
    const [professores] = await db.execute(
        "SELECT * FROM professores"
    )

    return res.json(professores)
})

// Cadastrar professor
app.post("/professores", async (req, res) => {
    const { nome } = req.body

    if (!nome) {
        return res.status(400).json("Nome não informado")
    }

    if (nome.length <= 2) {
        return res.status(400).json("Nome muito curto")
    }

    const [resultado] = await db.execute(
        "INSERT INTO professores(nome) VALUES (?)",
        [nome]
    )

    return res.status(201).json({
        id: resultado.insertId,
        nome
    })
})

app.post("/cursos", async (req, res) => {
    const {nome, professor_id} = req.boby

    if(!nome || !professor_id) {
        return res.status(400).json("Nome do professor id são obrigatórios")
    }

    const resultados = await db.execute("INSERT INTO cursos(nome,professor_id) (?, ?", [nome,professor_id])

    return res.status(201).json({id: resultado.insertId, nome})
})

app.listen(3000, () => console.log("API no ar :D"))







