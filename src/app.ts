import express from 'express'
import 'dotenv/config'

// Import router chính
import webRouters from 'src/routes/web'

// Import hàm seed database (tạo dữ liệu ban đầu)
import initDatabase from 'config/seed'

// Import passport (xử lý authentication)
import passport from 'passport'

// Import cấu hình passport local (username/password)
import configPassportLocal from './middleware/passport.local'

// Import session để lưu login state
import session from 'express-session'

// Khởi tạo app express
const app = express()

// Port chạy server (ưu tiên lấy từ .env)
const port = process.env.PORT || 3000


// ======================
// VIEW ENGINE (EJS)
// ======================

// Thiết lập EJS làm template engine
app.set('view engine', 'ejs')

// Thiết lập đường dẫn tới thư mục chứa file view (.ejs)
app.set('views', __dirname + '/views')


// ======================
// MIDDLEWARE
// ======================

// Cho phép server đọc dữ liệu JSON từ request
app.use(express.json())

// Cho phép đọc dữ liệu từ form (HTML form submit)
app.use(express.urlencoded({ extended: true }))

// Cho phép truy cập file tĩnh (css, js, images) từ thư mục public
app.use(express.static('public'))


// ======================
// SESSION
// ======================

// Cấu hình session để lưu trạng thái đăng nhập
app.use(session({
    secret: 'keyboard cat',        // key bí mật để mã hóa session
    resave: false,                // không lưu lại session nếu không thay đổi
    saveUninitialized: true       // lưu session dù chưa có dữ liệu
}))


// ======================
// PASSPORT (AUTH)
// ======================

// Khởi tạo passport
app.use(passport.initialize())

// Kích hoạt passport session để duy trì trạng thái đăng nhập
app.use(passport.session())

// Cấu hình chiến lược đăng nhập (local: username/password)
configPassportLocal()


// ======================
// ROUTES
// ======================

// Gọi router chính (tất cả route sẽ nằm trong đây)
webRouters(app)


// ======================
// DATABASE SEEDING
// ======================

// Chạy hàm tạo dữ liệu ban đầu (ví dụ: user admin)
initDatabase()


// ======================
// HANDLE 404
// ======================

// Nếu không khớp route nào → trả về 404
app.use((req: express.Request, res: express.Response) => {
    res.status(404).send('404 Not Found')
})


// ======================
// START SERVER
// ======================

// Chạy server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
    console.log('process.env.PORT:', process.env.PORT)
})