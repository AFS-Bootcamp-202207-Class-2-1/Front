import api from "./api"

export const getTicketInfo = (user) => {
    return api.post("/users/login", user)
};

export const deleteTicket = (user) => {
    return api.delete("/users/login", user)
};