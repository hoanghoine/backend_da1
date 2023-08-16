import Exception from '../error/Exception.js'
import { uniqueId } from '../helper/UniqueId.js'
import { CkModel, LbsModel, PdlModel, UserModel } from '../model/index.js'
import moment from 'moment-timezone'
import { userRepo } from './index.js'
import generatePassword from '../helper/genPass.js'
import { Op } from 'sequelize';
import Ck from '../model/Ck.js'

const getAllSchedule = async (doctorID) => {
    try {
        const schedule = await LbsModel.findAll({
            where: {
                IDUBS: doctorID
            }
        })
        return schedule
    } catch (exception) {
        throw exception
    }
}

const getDetailSchedule = async (doctorID, IDL, IDP) => {
    try {
        const detailSchedule = await LbsModel.findOne({
            where: {
                IDUBS: doctorID,
                IDL: IDL
            }
        })
        if (detailSchedule) {
            const detailorder = await PdlModel.findAll({
                where: {
                    IDP: IDP
                }
            })
            const result = {
                detailSchedule: detailSchedule,
                detailorder: detailorder
            }
            return result
        }
        else {
            throw new Exception("schedule not found")

        }


    } catch (exception) {
        throw exception
    }
}

const doctorCreateAppointment = async ({
    idDoctor,
    name,
    dob,
    sex,
    phoneNumber,
    BHYT,
    address,
    username,
    time,
    date,
}) => {
    debugger
    let appointment = await PdlModel.findAndCountAll({
        where: {
            time: time,
            date: date,
        }, raw: true
    })
    if (appointment.count >= 5) {
        throw new Exception("lich kham trong gio nay da day")
    }

    let existingUser = await UserModel.findOne({ where: { username: username }, raw: true })
    if (!existingUser) {
        const password = generatePassword()
        let newRegister = await userRepo.register({
            name,
            dob,
            sex,
            phoneNumber,
            BHYT,
            address,
            username,
            password
        })

        // throw new Exception(Exception.USER_EXIST)
        let existingUser = await UserModel.findOne({ where: { username: username }, raw: true })

        const newIDP = uniqueId()

        let docProfile = await UserModel.findOne({ where: { IDU: idDoctor }, raw: true })
        let room = docProfile.work_room

        const newSchedule = await PdlModel.create({
            IDP: newIDP,
            bookingAt: moment(appointment.bookingAt).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss'),
            time: time,
            date: date,
            address: existingUser.dia_chi,
            BHYT: existingUser.so_BHYT,
            phoneNumber: existingUser.sdt,
            sex: existingUser.gioi_tinh,
            dob: existingUser.ntns,
            name: existingUser.ho_ten,
            IDBS: idDoctor,
            IDUBN: existingUser.IDU,
            email: existingUser.username,
            isCancel: false
        })
        const doctorSchedule = await LbsModel.create({
            IDL: uniqueId(),
            date: date,
            time: time,
            address: room,
            IDUBS: idDoctor,
            IDP: newIDP
        })
        return {
            newRegister,
            password: password,
            newSchedule,
            doctorSchedule
        }




    }
    else {
        const newIDP = uniqueId()
        const newSchedule = await PdlModel.create({
            IDP: newIDP,
            bookingAt: moment(appointment.bookingAt).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss'),
            time: time,
            date: date,
            address: existingUser.dia_chi,
            BHYT: existingUser.so_BHYT,
            phoneNumber: existingUser.sdt,
            sex: existingUser.gioi_tinh,
            dob: existingUser.ntns,
            name: existingUser.ho_ten,
            IDBS: idDoctor,
            IDUBN: existingUser.IDU,
            email: existingUser.username,
            isCancel: false

        })
        let docProfile = await UserModel.findOne({ where: { IDU: idDoctor }, raw: true })
        let room = docProfile.work_room
        const doctorSchedule = await LbsModel.create({
            IDL: uniqueId(),
            date: date,
            time: time,
            address: room,
            IDUBS: idDoctor,
            IDP: newIDP
        })
        return {
            newSchedule,
            doctorSchedule
        }
    }

}
const getDetailDoctor = async (doctorID) => {
    const doctor = await UserModel.findOne({
        where: {
            IDU: doctorID,
            role: 3
        }, raw: true
    })
    if (!doctor) {
        throw new Exception('cant not find doctor')
    }
    let specialist = await CkModel.findOne({ where: { IDCK: doctor.IDCK }, raw: true })
    let result = { ...doctor, specialist: specialist }

    return result
}
const getDetailSpecialist = async (specialistID) => {
    const specialist = await CkModel.findOne({
        where: {
            IDCK: specialistID
        }, raw: true
    })
    if (!specialist) {
        throw new Exception('cant not find specialist')
    }
    return specialist
}

const getAllDoctor = async () => {
    try {
        const doctor = await UserModel.findAll({ where: { role: 3 }, raw: true })
        let result = {}
        for (let key in doctor) {
            if (doctor.hasOwnProperty(key)) {
                let specialist = await CkModel.findOne({ where: { IDCK: doctor[key].IDCK }, raw: true })
                result[key] = { ...doctor[key], specialist: specialist }
            }
        }
        return result
    } catch (exception) {
        throw exception
    }
}
const getAllSpecialist = async () => {
    try {
        const specialist = await CkModel.findAll({ raw: true })
        return specialist
    } catch (exception) {
        throw exception
    }
}
const getDoctorByName = async (name) => {
    try {
        const doctor = await UserModel.findAll({
            where: {
                ho_ten: {
                    [Op.like]: `%${name}%`
                },
                role: 3


            }, raw: true
        })
        return doctor
    } catch (exception) {
        throw exception
    }
}
const getDoctorBySpecialist = async (name) => {
    try {
        const specialist = await CkModel.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }, raw: true
        })
        return specialist
    } catch (exception) {
        throw exception
    }


}
export default {
    getAllSchedule,
    getDetailSchedule,
    doctorCreateAppointment,
    getDetailDoctor,
    getDetailSpecialist,
    getAllDoctor,
    getAllSpecialist,
    getDoctorByName,
    getDoctorBySpecialist
}