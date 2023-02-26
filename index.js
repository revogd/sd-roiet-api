const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    user: "sadsadee_roiet",
    host: "202.129.207.6",
    password: "Roiet101",
    database: "sadsadee_roiet",
    port: "3306"
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });

app.get('/soldiers', (req, res) => {
    db.query("SELECT เลขประจำตัวประชาชน, ชื่อ, นามสกุล, เกิด, บ้านเลขที่, หมู่ที่, ตำบล, อำเภอ, จังหวัด, Datelogin,เหตุจำหน่าย FROM TB_Recuit WHERE อำเภอ='เมยวดี' ORDER BY เกิด ASC", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("Sadsadee Roiet Database Connected");
            
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
            console.log("Sadsadee Roiet Database Connected");
            
        }
    });
});
app.listen(port, () => {
    console.log(`Server is running on PORT `+port)
})
