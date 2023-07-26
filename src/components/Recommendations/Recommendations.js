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
            <div className='recommendations'>
                <Link to='dailymix' onMouseOver={() => dispatch(setDailyMix(genres.slice(0,50)))}>
                    <img/>
                    <div>daily mix 1</div>
                </Link>
                <Link to='dailymix' onMouseOver={() => dispatch(setDailyMix(genres.slice(50)))}>
                    <img/>
                    <div>daily mix 2</div>
                </Link>
                <Link to='dailymix' onMouseOver={() => dispatch(setDailyMix(artists.slice(0,50)))}>
                    <img/>
                    <div>daily mix 3</div>
                </Link>
                <Link to='dailymix' onMouseOver={() => dispatch(setDailyMix(artists.slice(50)))}>
                    <img/>
                    <div>daily mix 4</div>
                </Link>
            </div>
        </div>
        
    )
}

Recommendations.propTypes = {
    token: PropTypes.string.isRequired
}

export default Recommendations