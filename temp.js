
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');

let userdb={

	host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'work',
	port:3306
}

const mysql=require('mysql2');
const con=mysql.createConnection(userdb);

app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not


app.get("/getitem",(req,resp)=>{

	let input=req.query.x;

	let output={itemfoundstatus:false,itemdetails:{bookid:4,bookname:"web",price:400}}

	con.query('select * from book where bookid =?',[input],(error,res)=>{

		if(res.length >0){

			output.itemfoundstatus=true;
			output.itemdetails=res[0];
		}
		resp.send(output);

	});
});

app.get("/updateitem",(req,resp)=>{

	let output=false;
	let input={bookid:req.query.bookid,price:req.query.price};

	con.query('update book set price =? where bookid =?',[input.price,input.bookid],(error,res1)=>{

		if(error){
			console.log("Error Occured");
		}
		else if(res1.affectedRows >0){
			output=true;
		}
		resp.send(output)
	});
});




//============================================================================================





app.listen(8081, function () {
    console.log("server listening at port 8081...");
});