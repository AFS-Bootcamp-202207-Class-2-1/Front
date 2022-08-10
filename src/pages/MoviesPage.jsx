import React ,{ useState,useEffect }from 'react'
import MovieDetails from '../components/movieDetail/MovieDetails'
import '../assets/less/MoviesPage.less'
import MovieIntroduce from '../components/movieDetail/MovieIntroduce'
import MovieImages from '../components/movieDetail/MovieImages'
import MovieComment from '../components/movieDetail/MovieComment'
import {getMovieDetail} from "../api/ticketSelect"
import { useParams } from 'react-router-dom'

function MoviesPage(props){

    const [movie, setMovie] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        getMovieDetail(id).then((response) => {
            setMovie(response.data)
        })
    })


    return (
        <div>
            <MovieDetails movie={movie} />
            <MovieIntroduce movie={movie}/>
            <MovieImages movie={movie}/>
            <MovieComment/>
        </div>
    )
}

export default MoviesPage
