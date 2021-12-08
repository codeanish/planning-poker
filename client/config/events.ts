const EVENTS = {
    CONNECTION: "connection",
    SERVER: {
        ROOMS: "rooms",
        JOINED_ROOM: "joined_room",
        PLAYED_CARD: "played_card",
        NEW_PLAYER_JOINED: "new_player_joined"
    },
    CLIENT: {
        CREATE_ROOM: "create_room",
        PLAY_CARD: "play_card",
        LOGIN: "login"
    }
}

export default EVENTS;