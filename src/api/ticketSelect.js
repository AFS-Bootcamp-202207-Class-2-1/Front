import api from "./api"

export const getSessions = (id) => {
    return api.get(`/session/${id}`)
};

export const getSessionSeats = (id) => {
    return api.get(`/seat/${id}`)
};

export const getMovieDetail = (id) => {
    return api.get(`/detail/${id}`)
};