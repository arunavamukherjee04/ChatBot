const users = [];

const User = {
    add: user => users.push(user),
    getById: id => users.filter(user => user.user_id === id),
    getAll: () => users,
    delete: (id) => {
        const selectedUser = users.find(_user => _user.user_id === id);
        users.splice(users.indexOf(selectedUser), 1)
    },
}

module.exports = User;