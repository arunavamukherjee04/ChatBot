const private_chats = [];

const PrivateChat = {
    add: chat => private_chats.push(chat),
    getByFriendId: id => private_chats.filter(chat => chat.chat_with.user_id === id)
}

module.exports = PrivateChat;