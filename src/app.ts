import express from 'express'   

import 'dotenv/config'

import webRouters from './routes/web'
import initDatabase from 'config/seed'



const app = express()
const port = process.env.PORT ||  3000






// THIẾT LẬP EJS LÀ VIEW ENGINE CHO ỨNG DỤNG
app.set('view engine', 'ejs');
//  NÓ LẤY ĐƯỜNG LÌNH CHUẨN ĐẾN THƯ MỤC VIEWS ĐỂ RENDER FILE EJS
app.set('views', __dirname + '/views');


// THIẾT LẬP EXPRESS ĐỂ XỬ LÝ DỮ LIỆU FORM  "middleware"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));






// file tĩnh sẽ được phục vụ từ thư mục 'public' "middleware"
app.use(express.static('public'))






// SỬ DỤNG WEB ROUTERS
webRouters(app)

// seeding data 
initDatabase()



app.use((req: express.Request, res: express.Response) => {
    res.send("404")

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log('process.env.PORT', process.env.PORT)
})