import express, { Express } from 'express'

const router = express.Router()
import {
    getHomePage,
    getCreateUserPage,
    postCreateUser,
    postDeleteUser,
    getViewUser,
    postUpdateUser,


} from '../controllers/user.controller'
import { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage } from 'controllers/admin/dashboard.controller'

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })






const webRouters = (app: Express) => {
    router.get("/", getHomePage)

    router.get("/create-user", getCreateUserPage)


    router.post("/delete-user/:id", postDeleteUser)

    router.get("/edit-user/:id", getViewUser)

    router.post("/handle-update-user", postUpdateUser)

    // admin page
    router.get("/admin", getDashboardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/product", getAdminProductPage)
    router.get("/admin/order", getAdminOrderPage)
    router.get("/admin/create-user", getCreateUserPage)
    // router.post("/admin/handle-create-user", upload.single('avatar'), postCreateUser)
    router.post("/admin/handle-create-user", upload.single('avatar'), (req, res) => {
        res.send('File uploaded successfully');
    })

    app.use('/', router)
}
export default webRouters