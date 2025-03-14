import jwt from 'jsonwebtoken'

const AuthUser = async (req,res,next) => {
    try {
        const { token } = req.headers
        if(!token){
            return res.json({ Success : false , Message : "Not Authorized Login Again !" })
        }
        const decode = await jwt.verify(token,process.env.JWT_TOKEN)
        req.body.userId = decode.id
        next()
    } catch (error) {
        console.log(error);
        res.json({ Success : false , Message : "Internal Server Error !" })
    }
}

export default AuthUser;