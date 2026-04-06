import express, { Express} from 'express'

const router = express.Router()
import {
    getHomePage ,
    getCreateUserPage,
    postCreateUser
} from '../controllers/user.controller'








const webRouters = (app: Express) => {
     router.get ("/" , getHomePage)
  
     router.get ("/create-user" , getCreateUserPage )

     router.post("/handle-create-user", postCreateUser)            



    app.use('/', router)
}
export default webRouters