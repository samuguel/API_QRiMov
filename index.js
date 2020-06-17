const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const sql = require('mssql');
const connStr = "STRING CONNECTION";

sql.connect(connStr)
   .then(conn => GLOBAL.conn = conn)
   .catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json());
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!'  }));
app.use('/', router);
app.listen(process.env.PORT);
console.log('API funcionando!');
function execSQLQuery(sqlQry, res){
        GLOBAL.conn.request()
                   .query(sqlQry)
                   .then(result => res.json(result.recordset))
                   .catch(err => res.json(err));
    
}
router.get('/imoveis', (req, res) =>{
    execSQLQuery('SELECT * FROM Imoveis', res);
})
