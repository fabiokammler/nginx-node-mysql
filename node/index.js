const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const connection = mysql.createConnection(config);
const sql = "INSERT INTO people(NAME) values('Fabio Kammler')";
connection.query(sql);
connection.end();

var htmlResp = "<h1>Full Cycle Rocks!</h1><ul>${{li}}</ul>";

function setRespHtml(query, cb) {
    const connection2 = mysql.createConnection(config);
    connection2.query(query, function (err, result, fields){
        if (err) throw err;

        var liComponent = "";

        for(var i=0; i < result.length; i++) {
            liComponent += "<li>"+result[i].name+"</li>";
        }
        
        connection2.end();
        return cb(liComponent);  
    })
}

app.get('/', (req,res) => {

    const query = "SELECT p.name FROM people p";

    setRespHtml(query, respcb=>{
        htmlResp = htmlResp.replace('${{li}}', respcb);
        res.send(htmlResp);
    })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port);
})