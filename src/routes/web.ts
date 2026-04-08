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
import { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage  } from 'controllers/admin/dashboard.controller'








const webRouters = (app: Express) => {
    router.get("/", getHomePage)

    router.get("/create-user", getCreateUserPage)

    router.post("/handle-create-user", postCreateUser)

    router.post("/delete-user/:id", postDeleteUser)

    router.get("/edit-user/:id", getViewUser)

    router.post("/handle-update-user", postUpdateUser)

    // admin page
    router.get("/admin", getDashboardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/product", getAdminProductPage)
    router.get("/admin/order", getAdminOrderPage)
    router.get("/admin/create-user", getCreateUserPage)


    app.use('/', router)
}
export default webRouters