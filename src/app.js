require('./db/database')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router/index')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger_output.json');

const app = express()
dotenv.config()
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '3000'

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/status', (req, res) => {
    res.json({ Hello: "World!" })
})

app.use('/api', router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, (err) => {
    if (err) { console.log(`Error:${err}`) }
    console.log(`Running on port ${PORT}, SUCCESSFULLY!`)
})
