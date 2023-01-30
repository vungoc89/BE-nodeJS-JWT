import db from "../models/models/index";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    if (users) {
      // let data = users.get({plain: true});
      return {
        EM: "Get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "Get data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(">>> error: ", error);
    return {
      EM: "Something wrong",
      EC: 1,
      DT: [],
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;

    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    return {
      EM: "Paginate success",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(">>>error: ", e);
    return {
      EM: "Something wrong",
      EC: 1,
      DT: [],
    };
  }
};
const createNewUser = async (data) => {
  try {
    let user = await db.User.create({});
  } catch (e) {
    console.log(">>>error: ", e);
  }
};
const updateUser = async (data) => {
  try {
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      //update
      user.save({});
    } else {
      //not found
    }
  } catch (e) {
    console.log(">>>error: ", e);
  }
};
const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });

    if (user) {
        await user.destroy();
      return {
        EM: "Delete success",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "User not found",
        EC: 2,
        DT: [],
      };
    }
  } catch (e) {
    console.log(">>>error: ", e);
    return{
          
        EM: 'Error from service',
        EC: 1,
        DT: [],
              
    }
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
