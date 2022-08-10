import React,{ useState,useEffect } from 'react'
import '../assets/less/IndexPage.less'
import { getMovies } from '../api'
import MovieItem from '../components/homepage/MovieItem'
import Carousel from '../components/homepage/Banner'

const IndexPage = () => {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        getMovies().then((response) => {
            setMovieList(response.data)
        })
    }, [])
    
    return (
        <div>
            <Carousel />
            <div className='recommend-title'>推荐电影</div>
            <div className='movies-recommend'>
                {
                    movieList.map((item,index) => (
                        <MovieItem key={index} value={item}/>
                ))}
            </div>
        </div>
    )
}

export default IndexPage;