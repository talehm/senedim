const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');

// https://github.com/mysqljs/mysql
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'taleh',
  password : '110106016',
  database : 'senedim',
  multipleStatements: true,
  charset: "utf8_general_ci"
});

// Initialize the app
var cors= require('cors');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// https://expressjs.com/en/guide/routing.html
app.post('/products', function (req, res) {
    var category_id = req.body.category_id;
    connection.query('SELECT * FROM products where category_id='+category_id, function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });

});

app.post('/default_temp', function (req, res) {
    var category_id = req.body.category_id;
    connection.query('select s.id as id, s.name as name,s.ref as ref, c.name as category_name from default_temp_section as s inner join category as c on s.category_id=c.id and c.id='+category_id, function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });
});

app.get('/category', function (req, res) {

    connection.query(
  ' SELECT  * ,'+
    '(SELECT SUM(product_sum) FROM view_1'+
        ' WHERE id = final.id) as product_count'+
          ' FROM category AS final;',
         function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });



});
// Start the server
app.listen(3100, () => {
 console.log('Go to http://localhost:3001/posts to see posts');
});
