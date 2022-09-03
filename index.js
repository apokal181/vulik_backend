
const Sequelize = require('sequelize')

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./routes/index')
const errorMiddleware = require('./middlewares/errorMiddleware');
const path = require("path");

const PORT = process.env.PORT || 7000


const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.static(path.resolve(__dirname, 'store')))
app.use(cookieParser())
app.use('/api', router)

// крайний мидлвариина обрбаботка ошибок, после него никаких роутов ничего !
app.use(errorMiddleware);

const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: 'ec2-44-209-186-51.compute-1.amazonaws.com',
    dialect: 'postgres',
    logging: false,
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

start()