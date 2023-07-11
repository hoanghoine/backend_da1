import { body, cookie, validationResult } from "express-validator";
import HttpStatusCode from '../error/HttpStatusCode.js'
import Express from "express";
import Exception from "../error/Exception.js";
import { EventEmitter } from 'node:events'
import { doctorRepo, userRepo } from '../repositories/index.js'
import user from "../repositories/user.js";
import jwt from "jsonwebtoken";
import { auth } from "./index.js"
import { log } from "node:console";
import { get } from "node:http";

const getDoctorById = async (req, res) => {
    let doctorID = req.params.id
    try {
        const doctor = await doctorRepo.getDetailDoctor(doctorID)
        res.status(HttpStatusCode.OK).json({
            message: 'get detail doctor sucessfully',
            data: {
                ...doctor,
                password: 'not show',
                refreshToken: 'not show',
                username: 'not show',
                role: 'not show',
                so_BHYT: 'not show'
            }
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNEL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}
const getSpecialistById = async (req, res) => {
    let specialistID = req.params.id
    try {
        const specialist = await doctorRepo.getDetailSpecialist(specialistID)
        res.status(HttpStatusCode.OK).json({
            message: 'get detail specialist sucessfully',
            data: {
                ...specialist
            }
        })
    } catch (exception) {
        console.log(exception);
        res.status(HttpStatusCode.INTERNEL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}
const getAllDoctor = async (req, res) => {
    try {
        const doctor = await doctorRepo.getAllDoctor()
        res.status(HttpStatusCode.OK).json({
            message: 'get all doctor sucessfully',
            data: {
                ...doctor
            }
        })
    } catch (exception) {
        console.log(exception);
        res.status(HttpStatusCode.INTERNEL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}
const getAllSpecialist = async (req, res) => {
    try {
        const specialist = await doctorRepo.getAllSpecialist()
        res.status(HttpStatusCode.OK).json({
            message: 'get all specialist sucessfully',
            data: {
                ...specialist
            }
        })
    } catch (exception) {
        console.log(exception);
        res.status(HttpStatusCode.INTERNEL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}
const getDoctorByName = async (req, res) => {
    let name = req.params.name
    try {
        const doctor = await doctorRepo.getDoctorByName(name)
        res.status(HttpStatusCode.OK).json({
            message: 'get doctor by name sucessfully',
            data: {
                ...doctor
            }
        })
    } catch (exception) {
        console.log(exception);
        res.status(HttpStatusCode.INTERNEL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}
const getDoctorBySpecialist = async (req, res) => {
    let specialist = req.params.specialist
    try {
        const doctor = await doctorRepo.getDoctorBySpecialist(specialist)
        res.status(HttpStatusCode.OK).json({
            message: 'get specialist sucessfully',
            data: {
                ...doctor
            }
        })
    } catch (exception) {
        console.log(exception);
        res.status(HttpStatusCode.INTERNEL_SERVER_ERROR).json({
            message: exception.toString()
        })
    }
}

export default {
    getDoctorById,
    getSpecialistById,
    getAllDoctor,
    getAllSpecialist,
    getDoctorByName,
    getDoctorBySpecialist

}