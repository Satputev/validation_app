let express = require("express");
let mssql = require("mssql");
let cors = require("cors");
let bodyparser = require("body-parser");

let app = express();

app.use(bodyparser.json());

app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));

app.post("/registeration", (req, res) => {
  mssql.connect(
    {
      user: "sa",
      password: "123",
      server: "localhost",
      database: "validation_db",
    },
    (err) => {
      if (err) throw err;
      else {
        //create the query object
        //query object used to create sql queries
        let request = new mssql.Request();
        //execute the query
        console.log(req.body.lname);
        request.query(
          `insert into register values('${req.body.fname}','${req.body.lname}','${req.body.email}',
      '${req.body.dob}','${req.body.gender}','${req.body.languages}','${req.body.country}')`,
          (err) => {
            if (err) throw err;
            else {
              res.send({ registration: "Success" });
            }
          }
        );
      }
    }
  );
});

//asign the port no

app.listen(8080);
console.log("server listining port no 8080");
