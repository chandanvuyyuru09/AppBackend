const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Record = require('./models/record');
const cors = require('cors');
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,resp)=>{
  resp.send('Hello world');
});

function provideValidationErrors(errors,fields){
  let clientErrorObj = {};
  for(let field of fields){
    if(errors[field]){
      clientErrorObj[field] = `${field} is required`
    }
  }
  return clientErrorObj;
}

app.post('/api/records',(req,resp)=>{
  let record = new Record(req.body);
  record.result = record.first * record.second;
  let validationError = record.validateSync();
  if(validationError){
    resp.status(400).send(provideValidationErrors(validationError.errors,
        Object.keys(Record.schema.paths)));
  }else{
    record.save((err,docSaved)=>postCallBack(resp,err,docSaved));
  }
});


function postCallBack(resp,err,doc){
  //console.log(err);
  if(err){
    resp.status(500).send(err);
  }else{
      resp.status(201).send(doc);
  }
}

function callBack(resp,err,docs){
  if(err){
    resp.status(500).send(err);
  }else{
    resp.send(docs);
  }

}

app.get('/api/records',function(req,resp){
  Record.find((err,docs)=>callBack(resp,err,docs));
});

app.listen(port,()=>console.log(`server started on port ${port}`));
