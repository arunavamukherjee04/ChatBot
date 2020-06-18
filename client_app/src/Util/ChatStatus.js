const chat_statuses = [];

const ChatStatus = {
    add: chat_status => chat_statuses.push(chat_status),
    getByFriendId: id => chat_statuses.find(chat_status => chat_status.chat_with.user_id === id),
    updateStatus: (id, status) => {
        let to_be_updated_status = chat_statuses.find(chat_status => chat_status.chat_with.user_id === id);
        if (to_be_updated_status) {
            to_be_updated_status._status = status;
        }
    }
}

module.exports = ChatStatus;