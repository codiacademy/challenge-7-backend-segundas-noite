import express from 'express'
import router from './functions/users/delete-users'

const app = express()

app.use(express.json())
app.use(router)

//Simulando o Banco de Dados
export let users = [
  { id: 1, name: 'João' },
  { id: 2, name: 'Maria' },
  { id: 3, name: 'Pedro' },
]

// Buscando usuários
app.get('/users', (req, res) => {
  res.json(users)
})

// Informando onde o servidor estará rodando
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
