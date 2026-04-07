import express, { Express} from 'express'

const router = express.Router()
import {
    getHomePage ,
    getCreateUserPage,
    postCreateUser,
    postDeleteUser , 
    getViewUser,
    postUpdateUser
    
} from '../controllers/user.controller'








const webRouters = (app: Express) => {
     router.get ("/" , getHomePage)
  
     router.get ("/create-user" , getCreateUserPage )

     router.post("/handle-create-user", postCreateUser)            

     router.post("/delete-user/:id", postDeleteUser)

     router.get("/edit-user/:id", getViewUser )

    router.post("/handle-update-user", postUpdateUser)



    app.use('/', router)
}
export default webRouters