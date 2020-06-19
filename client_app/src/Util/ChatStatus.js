const chat_statuses = [];

const ChatStatus = {
    upsert: (chat_status) => {
        const { chat_with, status } = chat_status;

        /**
         * check if status exist or not
         */
        const existing_status = ChatStatus.getByFriendId(chat_with.user_id);
        if (existing_status !== undefined) {
            /**
             * update
             */
            ChatStatus.updateStatus(chat_with.user_id, status);
        } else {
            /**
             * insert
             */

            ChatStatus.add(chat_status);
        }
    },
    add: chat_status => chat_statuses.push(chat_status),
    getByFriendId: id => chat_statuses.find(chat_status => chat_status.chat_with.user_id === id),
    updateStatus: (id, status) => {
        let to_be_updated_status = chat_statuses.find(chat_status => chat_status.chat_with.user_id === id);
        if (to_be_updated_status) {
            to_be_updated_status.status = status;
        }
    }
}

module.exports = ChatStatus;