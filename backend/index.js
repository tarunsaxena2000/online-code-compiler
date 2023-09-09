const express =require("express");
const cors = require("cors");
const app = express();
const  mongoose  = require ('mongoose')

const {generateFile} = require("./generateFile");
const {executeCpp} =require("./executeCpp");
const { executePy } = require("./executePy");



app.use(cors());


app.use(express.urlencoded({extended :true}))
app.use(express.json());
app.get('/',(req,res)=>{

    return res.json({hello:"world2"})
});


app.post("/run",async(req,res)=>{
const {language="cpp" , code} = req.body


if(code === undefined){
    return res.status(400).json({success:false ,error :"empty code value" })
}



try {

const filepath = await generateFile(language , code);
  
let output;
if(language === "cpp"){
  output  = await executeCpp(filepath);
} 
else{
    output = await executePy(filepath);
}
    return res.json({filepath,output})

} catch (err){
    res.status(500).json({err})
}

// need to generate a c++  file with content from the request //
  
});

app.listen(5000,()=>{
    console.log(`listening on port 5000`)
});