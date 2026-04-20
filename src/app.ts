/// <reference path="./types/index.d.ts" />

import express from 'express'
import 'dotenv/config'
import webRouters from 'src/routes/web'
import initDatabase from 'config/seed'
import passport from 'passport'

// Import cấu hình passport local (username/password)
import configPassportLocal from './middleware/passport.local'

// Import session để lưu login state
import session from 'express-session'

import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import { getUserById } from 'services/user.service';


const app = express()
const port = process.env.PORT || 3000

// Cấu hình chiến lược đăng nhập (local: username/password)
configPassportLocal()

// Thiết lập EJS làm template engine
app.set('view engine', 'ejs')

// Thiết lập đường dẫn tới thư mục chứa file view (.ejs)
app.set('views', __dirname + '/views')

// MIDDLEWARE

// Cho phép server đọc dữ liệu JSON từ request
app.use(express.json())

// Cho phép đọc dữ liệu từ form (HTML form submit)
app.use(express.urlencoded({ extended: true }))

// Cho phép truy cập file tĩnh (css, js, images) từ thư mục public
app.use(express.static('public'))


// Cấu hình session để lưu trạng thái đăng nhập
app.use(session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: false,    //k lưu lại nếu k thay đỗi 
    saveUninitialized: false, // k lưu khi null
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 1 * 2 * 4 * 60 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        })     // lưu session dù chưa có dữ liệu
}))


// Khởi tạo passport
app.use(passport.initialize())

// Kích hoạt passport session để duy trì trạng thái đăng nhập
app.use(passport.authenticate('session'))

// config global
app.use(async (req, res, next) => {
    const sessionUserId = (req.session as any)?.passport?.user?.id;

    if (!req.user && sessionUserId) {
        const userFromSession = await getUserById(String(sessionUserId));
        if (userFromSession) {
            (req as any).user = userFromSession;
        }
    }

    res.locals.user = req.user || null; // Pass user object to all views
    next();
});





// Gọi router chính (tất cả route sẽ nằm trong đây)
webRouters(app)

//  api
// apiRoutes(app)

// Chạy hàm tạo dữ liệu ban đầu (ví dụ: user admin)
initDatabase()

// Nếu không khớp route nào → trả về 404
app.use((req, res) => {
    res.render("status/404.ejs")
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
    console.log('process.env.PORT:', process.env.PORT)
})