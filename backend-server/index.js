const express = require('express')
const { randomBytes } = require('node:crypto')
const { Client } = require('pg')
//const bodyParser = require('body-parser')
const app = express()

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: '1234',
})
client.connect()

//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json())
app.use(express.json())

app.get('/', function (req, res) {
  res.send("How to USE api: \n '/' : is how to use \n '/StoreData' : send data to here to store it \n '/NewReciptID' : get a new ID for a new recipt")
})

app.post('/StoreData', async function (req, res) {
  for (let index = 0; index < req.body.data.length; index++) {
    const answer = await client.query('INSERT INTO test.recipts(reciptid, item, price) VALUES($1, $2, $3) RETURNING *', [req.body.reciptid, req.body.data[index].itemName, req.body.data[index].itemCost])
    console.log(answer.rows[0])
  }
  console.log(req.body)
  res.json({
    "status": 200
  })
})

app.get('/GetReciptID', async function (req, res) {
  buf = randomBytes(16).toString('hex')
  // this is hard coded for the first user for now as it is more important to get something working
  const aa = await client.query('INSERT INTO test.reciptids(reciptid, uid) VALUES($1, $2) RETURNING *', [buf, 1])
  console.log(aa.rows[0])
  res.json({
    "status": 200,
    "reciptID": buf
  })
})
console.log("http://localhost:3000")

app.listen(3000)