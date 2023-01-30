
import userApiService from '../service/userApiService';

const readUserFunc = async(req, res) => {
    try {
        console.log(">>>req query:", req.query);
        if(req.query.page && req.query.limit){
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await userApiService.getUserWithPagination(+page,+limit);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
        }else{

        let data = await userApiService.getAllUser();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
                    
    }
    } catch (error) {
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: '',
        })
    }
}
const createUserFunc = (req, res) => {

}
const updateUserFunc = (req, res) => {

}
const deleteUserFunc = async(req, res) => {
    try {
       let data = await userApiService.deleteUser(req.body.id);
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

module.exports={
    readUserFunc,
    createUserFunc,
    updateUserFunc,
    deleteUserFunc
}