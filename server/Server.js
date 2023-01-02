import express from 'express'
import cors from 'cors'
import { ApiRoutes } from '../src/routes'


class Server{
    constructor(){
        this.port = process.env.APP_PORT
        this.connectToDatabase()
        this.app = express()
        this.middlewares()
        this.routes()
    }

    connectToDatabase(){
        require('../database/database.js')
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(){
        this.app.use('/api', ApiRoutes)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('listen at port ' + this.port)
        })
    }
}

export default Server