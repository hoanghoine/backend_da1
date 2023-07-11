import express from 'express'
import { listController } from '../controller/index.js'


const router = express.Router()
router.get('/doctor/get-by-name/:name', listController.getDoctorByName) // lấy thông tin của bs theo tên
router.get('/doctor/:id', listController.getDoctorById) // lấy thông tin của bs theo id
router.get('/specialist/:id', listController.getSpecialistById) // lấy thông tin của chuyên khoa
router.get('/specialist/get-by-name/:specialist', listController.getDoctorBySpecialist) // lấy thông tin của chuyên khoa

router.get('/doctors', listController.getAllDoctor) // lấy thông tin của tất cả bác sĩ
router.get('/specialists', listController.getAllSpecialist) // lấy thông tin của tất cả chuyên khoa



export default router