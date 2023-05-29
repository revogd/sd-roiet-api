const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });

app.get('/soldiers', (req, res) => {
    db.query("SELECT id, เลขประจำตัวประชาชน, ชื่อ, นามสกุล, เกิด, บ้านเลขที่, หมู่ที่, ตำบล, อำเภอ, จังหวัด, Datelogin,เหตุจำหน่าย FROM TB_Recuit WHERE อำเภอ='เมยวดี' ORDER BY เกิด ASC", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("Get by criteria successfully");
            
        }
    });
});

app.get('/soldier/:pid', (req, res) => {
    const pid = req.params.pid;
    db.query("SELECT เลขประจำตัวประชาชน,ชื่อ,นามสกุล,เกิด,อำเภอ,จังหวัด, FROM TB_Recuit WHERE เลขประจำตัวประชาชน = ?", 
    [pid],
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
