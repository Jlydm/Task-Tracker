import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json({"users": ["userOne", "userTwo", "userThree"] })
})

app.listen(port, () => {
  console.log(`Task tracker listening on port ${port}`)
})