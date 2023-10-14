import 'dotenv/config'
import  jwt  from 'jsonwebtoken'

export const generateToken = (user) => {
    const token = jwt.sign({user},process.env.JWT_SECRET,{expiresIn:'12h'})
    console.log(token)
    return token    
}

export const authToken = (req,res, next) => {
    const authHeader = req.headers.Authorization
    if(!authHeader){
        res.status(401).send({error:'Usuario no autenticado'})
    }

    const token = authHeader.split(' ')[1] // Obtengo el token y descarto el Bearer del header
    jwt.sign(token, process.env.JWT_SECRET, (error, credential)=> {
        if(error){
            return res.status(403).send({error: 'Usuario no autorizado, Token invalido'})
        }
    })

    // Usuario Valido
    req.user = credential.user
    next()
}