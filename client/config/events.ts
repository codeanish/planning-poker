const EVENTS = {
    CONNECTION: "connection",
    SERVER: {
        ROOMS: "rooms",
        JOINED_ROOM: "joined_room",
        PLAYED_CARD: "played_card",
        NEW_PLAYER_JOINED: "new_player_joined",
        ERROR: "error",
        PLAYER_LEFT_ROOM: "player_left_room"
    },
    CLIENT: {
        CREATE_ROOM: "create_room",
        JOIN_ROOM: "join_room",
        PLAY_CARD: "play_card",
        LOGIN: "login",
        GET_ROOMS: "get_rooms",
        DISCONNECT: "disconnect",
        DISCONNECTING: "disconnecting"
    }
}

export default EVENTS;