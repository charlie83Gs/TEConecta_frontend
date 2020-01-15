const ROUTES={
    NEWS_FEED : "/",
    MENU : "/menu",
    LOGIN : "/login",
    ADD_USER : "/addUser",
    ADD_EVENT : "/addEvent",
    ADMIN_USER : "/adminUsers",
    LIST_USER : "/userList",
    ADMIN_EVENT : "/adminEvents",
    EVENT_HISTORY : "/eventHistory",
    VIEW_USER : "/ViewUser",
    VIEW_PARTICIPANTS : "/participants",
    VIEW_REGISTER : "/ViewRegister",
    VIEW_EVENT : "/ViewEvent/:event_id",
    VIEW_EVENT_NO_HANDLE : "/ViewEvent", //must be same as view event without : event_id

}

export default ROUTES;