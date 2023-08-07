import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import trackServices from '../../services/trackServices'
import './Recommendations.css'
import { Link } from 'react-router-dom'
// import RecommendationsDisplay from './RecommendationsDisplay/RecommendationsDisplay'
import { useDispatch } from 'react-redux'
import { setDailyMix } from '../../reducers/dailyMixReducer'

const Recommendations = ({token}) => {
    const [genres, setGenres] = useState(null)

    const [artists, setArtists] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const genreResponse = await trackServices.getAvailableGenreSeeds(token)
            const artistResponse = await trackServices.getUsersTopItems(token, 'artists')
            const artistIDs = artistResponse.items.map(item => item.id)

            trackServices.getRecommendations(token, 'seed_artists', artistIDs.slice(0,5).join('%2C')).then(res => setArtists(res.tracks))
            trackServices.getRecommendations(token, 'seed_genres', genreResponse.genres.slice(0,5).join('%2C')).then(res => setGenres(res.tracks))
        })()
    }, [])

    if (genres === null || artists === null){
        return (
            <></>
        )
    }
    return (
        <div className='middle'>
            <h3>Made for you</h3>
            <div className='recommendations'>
                <Link className='recommendation-link' to='dailymix' onMouseOver={() => dispatch(setDailyMix(genres.slice(0,25)))}>
                    <img src={genres[0].album.images[0].url} className='recommendation-cover'/>
                    <div>Daily Mix 1</div>
                </Link>
                <Link className='recommendation-link' to='dailymix' onMouseOver={() => dispatch(setDailyMix(genres.slice(25,50)))}>
                    <img src={genres[25].album.images[0].url} className='recommendation-cover'/>
                    <div>Daily Mix 2</div>
                </Link>
                <Link className='recommendation-link' to='dailymix' onMouseOver={() => dispatch(setDailyMix(genres.slice(50,75)))}>
                    <img src={genres[50].album.images[0].url} className='recommendation-cover'/>
                    <div>Daily Mix 3</div>
                </Link>
                <Link className='recommendation-link' to='dailymix' onMouseOver={() => dispatch(setDailyMix(genres.slice(75)))}>
                    <img src={genres[75].album.images[0].url} className='recommendation-cover'/>
                    <div>Daily Mix 4</div>
                </Link>
            </div>
            <div className='recommendations'>
                <Link className='recommendation-link' to='dailymix' onMouseOver={() => dispatch(setDailyMix(artists.slice(0,25)))}>
                    <img src={artists[0].album.images[0].url} className='recommendation-cover'/>
                    <div>Daily Mix 5</div>
                </Link>
                <Link className='recommendation-link' to='dailymix' onMouseOver={() => dispatch(setDailyMix(artists.slice(25,50)))}>
                    
                    <img src={artists[25].album.images[0].url} className='recommendation-cover'/>
                    <div>Daily Mix 6</div>
                </Link>
                <Link className='recommendation-link' to='dailymix' onMouseOver={() => dispatch(setDailyMix(artists.slice(50,75)))}>
                    <img src={artists[50].album.images[0].url} className='recommendation-cover'/>
                    <div>Daily Mix 7</div>
                </Link>
                <Link className='recommendation-link' to='dailymix' onMouseOver={() => dispatch(setDailyMix(artists.slice(75)))}>
                    <img src={artists[75].album.images[0].url} className='recommendation-cover'/>
                    <div>Daily Mix 8</div>
                </Link>
            </div>
        </div>
        
    )
}

Recommendations.propTypes = {
    token: PropTypes.string.isRequired
}

export default Recommendations