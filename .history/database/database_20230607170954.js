import mysql from "mysql2"
import { print, outPutType } from "../helper/print.js"
import Exception from "../error/Exception.js"
import conconfig from "./connectionCF.js"
// import dotenv from "dotenv"

async function connect(){
    

    // debugger
    let con =  mysql.createConnection(conconfig)
    con.connect(function(err){
        if (err) {
            throw err
            console.log(err)}
    })

}

export default connect
