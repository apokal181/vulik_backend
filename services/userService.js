const {User} = require('../models/models');

class UserService {
    async getAllUsers() {
        const users = await User.findAll({raw: true});
        return users;
    }
}

module.exports = new UserService();