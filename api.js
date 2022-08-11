const express = require ('express')
const bodyParser = require ('body-parser')

const client = require('./connection')
const app = express()

app.use(bodyParser.json())

app.listen(3100, () => {
    console.log(`server 3100 berjalan dengan baik`)
});

client.connect(err => {
    if(err){
        console.log(err.message)
    }else{
        console.log(`Connect`)
    }
});

app.get('/murid', (req, res) =>{
    client.query(`Select * from students`, (err, result) =>{
        if(!err){
            res.status(200).json({
                message:'Sukses',
                result:result.rows
            })
        }
    })
});

app.post('/murid', (req, res) => {
    const {name, age, gender} = req.body

    client.query((`insert into students(name,age,gender)values('${name}', '${age}', '${gender}')`), (err, result) =>{
        if(!err){
            res.status(200).json({
                message:'Sukses',
                result:'Data Berhasil Input'
            })
        }else{
            res.status(500).json({
                message:'Gagal',
                result:err.message
            })
        }
    })
});

app.put('/murid/:id', (req, res) =>{
    const{name, age, gender} = req.body
    client.query((`update students set name='${name}', age='${age}', gender='${gender}' where student_id='${req.params.id}'`), (err, result) =>{
        if(!err){
            res.status(200).json({
                message:'Sukses',
                result:'Update Berhasil'
            })
        }else{
            res.status(500).json({
                message:'Gagal',
                result:err.message
            })
        }
    })
});

app.delete('/murid/:id', (req, res) =>{
    client.query((`delete from students where student_id= ${req.params.id}`), (err, result) =>{
        if(!err){
            res.status(200).json({
                message:'Sukses',
                result:'Delete berhasil'
            })
        }else{
            res.status(500).json({
                message:'Gagal',
                result:err.message
            })
        }
    })
});

app.get('/murid/:id', (req, res) =>{
    client.query((`select * from students where student_id= ${req.params.id}`), (err, result) =>{
        if(!err)
        {
            res.status(200).json({
                message:'Sukses',
                result:result.rows
            })
        }
    })
});