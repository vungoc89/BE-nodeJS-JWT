
import loginRegisterService from '../service/loginRegisterService';

const testApi = (req, res) => {
    return res.status(200).json({
        mess: 'ok',
        data: 'test api'
    })
}

const handleRegister = async(req, res) => {
    // console.log(">>> call register: ", req.body);
    try {
        if(!req.body.email || !req.body.phone || !req.body.password){
            return res.status(200).json({
                EM: 'Missing required parameters',
                EC: '1',
                DT: '',
            })
        }
        if(req.body.password && req.body.password.length < 3){
            return res.status(200).json({
                EM: 'Password must have min 3 letters',
                EC: '1',
                DT: '',
            })
        }
        //Service: create user
        let data = await loginRegisterService.registerNewUser(req.body);


        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: '',
        })

    } catch (error) {
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: '',
        })
    }
}

const handleLogin = async(req, res) => {
    console.log(">>>check login from react: ", req.body);

    try {
        let data = await loginRegisterService.handleUserLogin(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: '',
        })
    }
   
}
module.exports = {
    testApi,
    handleRegister,
    handleLogin,
}