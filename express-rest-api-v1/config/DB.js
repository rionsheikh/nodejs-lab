const mysql=require("mysql")

const pool=mysql.createPool({
    connectionLimit:10,
    user:"root",
    host:"localhost",
    password:"",
    database:"web"
})
let db = {};

db.getAllUsers=()=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM user',(error,users)=>{
            if(error){
                return reject(error)
            }
            return resolve(users)
        })
    })
}


db.getOneUser=(id)=>{
    return new Promise((resolver,reject)=>{
        pool.query("SELECT * FROM user WHERE id=?",[id],(error,user)=>{
            if(error){
                return reject(error)
            }
            return resolver(user)
        })
    })
}


db.insertUser=(name,email,pass)=>{

    return new Promise((resolve,reject)=>{
        pool.query("INSERT INTO user (name,email,pass) VALUES(?,?,?)",[name,email,pass],(error,result)=>{
            if(error){
                console.log(error)
                return reject(error)
            }
            return resolve(result)
        })
    })
}


db.updateUser=(name,email,pass,id)=>{
    return new Promise((resolve,reject)=>{
        pool.query("UPDATE user SET name=?,email=?,pass=? WHERE id=?",[name,email,pass,id],(error,result)=>{
            if(error){
                return reject(error)
            }
            return resolve()
        })
    })
}

db.deleteUser=(id)=>{
    return new Promise((resolve,reject)=>{
        pool.query("DELETE FROM  user WHERE id=?",[id],(error,result)=>{
            if(error){
                return reject(error)
            }
            return resolve(result)
        })
    })
}



module.exports = db