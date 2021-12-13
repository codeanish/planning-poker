const EVENTS = {
    CONNECTION: "connection",
    SERVER: {
        ROOMS: "rooms",
        JOINED_ROOM: "joined_room",
        PLAYED_CARD: "played_card",
        NEW_PLAYER_JOINED: "new_player_joined",
        ERROR: "error"
    },
    CLIENT: {
        CREATE_ROOM: "create_room",
        JOIN_ROOM: "join_room",
        PLAY_CARD: "play_card",
        LOGIN: "login"
    }
}

export default EVENTS;