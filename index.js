const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
const port = process.env.PORT || 3001
require('dotenv').config()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    user: process.env.user,
    host: process.env.host,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Mysql database Connected!");
  });

app.get('/soldiers', (req, res) => {
    db.query("SELECT เลขประจำตัวประชาชน, ชื่อ, นามสกุล, เกิด, บ้านเลขที่, หมู่ที่, ตำบล, อำเภอ, จังหวัด, Datelogin,เหตุจำหน่าย FROM TB_Recuit WHERE อำเภอ='เมยวดี' AND เกิด='2546' ORDER BY เกิด ASC", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("Get by criteria successfully");
            
        }
    });
});

app.get('/soldier/:pid', (req, res) => {    
    db.query("SELECT เลขประจำตัวประชาชน,ชื่อ,นามสกุล,วันเกิด เดือนเกิด,เกิด,ตำบล,อำเภอ,จังหวัด FROM TB_Recuit WHERE เลขประจำตัวประชาชน=?",
    [req.params.pid],
    (err, result) => {
        
        
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("Get by id successfully");
            
        }
    });
});
app.listen(port, () => {
    console.log(`Server is running on PORT `+port)
})
