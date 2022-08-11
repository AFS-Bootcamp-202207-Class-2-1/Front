import api from "./api"

export const getTicketInfo = (userId) => {
    return api.get("/ticket/" + userId)
};

export const deleteTicket = (id) => {
    return api.delete(`/ticket/delete/${id}`)
};

export const addComment = (message) =>{
    return api.post("/comment/addComment",message)
}