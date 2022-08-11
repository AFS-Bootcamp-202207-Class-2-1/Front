import api from "./api"

export const postOrder = (order) => {
    return api.post("/seat",order);
};
