const express   = require("express"),
      DB=require('../config/DB'),
      API_Router=express.Router();
      

API_Router.get("/", async(req,res)=>{
    try{
        const users=await DB.getAllUsers();
        res.status(200).json({users:users})
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})

API_Router.param("userid",async(req,res,next,userid)=>{
    try{
        const user=await DB.getOneUser(userid);
        req.user=user;
        next()
    }catch(e){
        res.sendStatus(500)
    }
})

API_Router.get('/:userid',(req,res,next)=>{
    if(req.user.length > 0){
        res.status(200).json({user:req.user})
 
    }else{
        res.sendStatus(404)
    }
})



API_Router.post('/', async(req,res,next)=>{
 try{
    const name=req.body.name;
    const email=req.body.email;
    const pass= req.body.pass;
  const data=await DB.insertUser(name,email,pass);

    res.status(201).json({unique_id:data.insertId})
}catch{
     res.sendStatus(400)
 }
})

API_Router.put('/:userid',async (req,res,next)=>{
    try{
        const name=req.body.name;
        const email=req.body.email;
        const pass=req.body.pass;

        const id=parseInt(req.params.userid)
      
    const user=await DB.updateUser(name,email,pass,id)
    res.sendStatus(201)

    }catch(e){
        console.log(e)
        res.sendStatus(400)
    }
})


API_Router.delete("/:userid",async(req,res,next)=>{
    try{
        const userid= parseInt(req.params.userid)
        const response=await DB.deleteUser(userid);
        res.sendStatus(204)
    }catch(e){
        console.log(e);
        res.sendStatus(404)
    }
})
module.exports=API_Router;