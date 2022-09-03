const {User} = require('../models/index');

class UserService {
    async getAllUsers() {
        const users = await User.findAll({raw: true});
        return users;
    }
}

module.exports = new UserService();