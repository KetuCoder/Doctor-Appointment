import jwt from 'jsonwebtoken'

const AuthAdmin = async (req,res,next) => {
    try {
        const { atoken } = req.headers
        if(!atoken){
            return res.json({ Success : false , Message : "Not Authorized Login Again !" })
        }
        const decode = jwt.verify(atoken,process.env.JWT_TOKEN)
        if(decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({ Success : false , Message : "Not Authorized !" })
        }
        next()
    } catch (error) {
        console.log(error);
        res.json({ Success : false , Message : "Internal Server Error !" });
    }
}

export default AuthAdmin;