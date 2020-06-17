const users = [];

const User = {
    add: user => users.push(user),
    getById: id => users.filter(user => user.user_id === id),
    getAll: () => users
}

module.exports = User;