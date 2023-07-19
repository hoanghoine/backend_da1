import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from "cookie-parser";
import connect from "./database/database.js";
import { OutPutType, print } from "./helper/print.js";
import { patientRouter, doctorRouter, bookingRouter, find, managementRouter } from "./router/index.js";
import bodyParser from 'body-parser'

dotenv.config()
const app = express()
app.use(cors({}))
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.header('Access-Control-Allow-Credentials', 'true'); // Cho phép trình duyệt lưu trữ cookie
//     res.header()
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//         return res.status(200).json({});
//     }

//     next();
// });
app.use(express.json())// đảm bảo rằng dữ liệu được gửi đến từ yêu cầu HTTP với kiểu Content-Type là application/json sẽ được phân tích và chuyển đổi thành JavaScript object
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
const PORT = process.env.PORT ?? 3000

app.use('/users', patientRouter)
app.use('/list', find)
app.use('/doctorapi', doctorRouter)
app.use('/booking', bookingRouter)
app.use('/management', managementRouter)


// app.use('/user')
app.listen(PORT, async () => {
    debugger
    await connect() // connect to DB
    print(`listening on ${PORT}`, OutPutType.SUCESS)
})