import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import trackServices from '../../services/trackServices'

const Recommendations = ({token}) => {
    const [genres, setGenres] = useState(null)

    const [artists, setArtists] = useState(null)

    useEffect(() => {
        (async () => {
            const genreResponse = await trackServices.getAvailableGenreSeeds(token)

            const artistResponse = await trackServices.getUsersTopItems(token, 'artists')
            const artistIDs = artistResponse.items.map(item => item.id)

            trackServices.getRecommendations(token, 'seed_artists', artistIDs.slice(0,5).join('%2C')).then(res => setArtists(res))
            trackServices.getRecommendations(token, 'seed_genres', genreResponse.genres.slice(0,5).join('%2C')).then(res => setGenres(res))
        })()
    }, [])

    if (genres === null || artists === null){
        return (
            <></>
        )
    }
    return (
        <div>
            <div>{genres.tracks.map(track => <div key={track.id}>{track.name}</div>)}</div>
            <div>----------------------------------------------</div>
            {console.log(artists)}
            <div>{artists.tracks.map(track => <div key={track.id}>{track.name}</div>)}</div>
        </div>
    )
}

Recommendations.propTypes = {
    token: PropTypes.string.isRequired
}

export default Recommendations