import api from "./api"

export const getAllMoviesType = () => {
    return api.get("/category")
};

export const getMoviesByCategory = (id,page) => {
    return api.get("/category/" +id, { params:{page:page, pageSize:12 }})
};

export const getMoviesByPage = (page) => {
    return api.get("/category", { params:{page:page, pageSize:12 }})
};
