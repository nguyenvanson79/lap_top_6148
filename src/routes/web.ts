import express, { Express } from 'express'

const router = express.Router()
import {
    getHomePage,
    getCreateUserPage,
    postCreateUser,
    postDeleteUser,
    getViewUser,
    postUpdateUser,
    getProductFilterPages,


} from '../controllers/user.controller'
import { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage } from 'controllers/admin/dashboard.controller'
import fileUploadMiddleware from 'src/middleware/multer'
import { getAdminCreateProductPage, getViewProduct, postAdminCreateProduct, postDeleteProduct, postUpdateProduct } from 'controllers/admin/product.controller'
import { getProductPage } from 'controllers/client/product.controller'
import { getLoginPage, getRegisterPage, getSuccessRedirectPage, postLogin, postLogout, postRegister } from 'controllers/client/auth.controller'
import { isAdmin, isLogin } from 'src/middleware/auth'



const webRouters = (app: Express) => {


    // client page
    router.get("/", getHomePage)
    router.get("/success-redirect",getSuccessRedirectPage)
    router.get("/product/:id", getProductPage)
    router.get("/create-user", getCreateUserPage)
    router.get("/login", getLoginPage)
    router.post("/login", postLogin);


    router.get("/register", getRegisterPage)
    router.post("/register", postRegister)

    router.post("/logout", postLogout)

    router.get("/products", getProductFilterPages)







    // admin page
    router.get("/admin", getDashboardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/order", getAdminOrderPage)
    router.get("/admin/create-user", getCreateUserPage)
    router.post("/admin/handle-create-user", fileUploadMiddleware('avatar'), postCreateUser)
    router.post("/admin/delete-user/:id", postDeleteUser)
    router.get("/admin/edit-user/:id", getViewUser)
    router.post("/admin/update-user", fileUploadMiddleware('avatar'), postUpdateUser)

    router.get("/admin/product", getAdminProductPage)
    router.get("/admin/create-product", getAdminCreateProductPage)
    router.post("/admin/create-product", fileUploadMiddleware('image', "images/product"), postAdminCreateProduct)

    router.post("/admin/delete-product/:id", postDeleteProduct)
    router.get("/admin/view-product/:id", getViewProduct)
    router.post("/admin/update-product/:id", fileUploadMiddleware('image', "images/product"), postUpdateProduct)










    app.use('/',isAdmin, router)
}
export default webRouters