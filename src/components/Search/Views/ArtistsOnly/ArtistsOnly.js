import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { FaCirclePlay } from 'react-icons/fa6'
import { AiOutlinePauseCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import trackServices from '../../../../services/trackServices'

import './ArtistsOnly.css'

const ArtistsOnly = ({artists, token, player}) => {
    const status = useSelector(state => state.status.status)
    

    const handlePlay = async (uri) => {
        const is_current_artist = status.track_window.current_track.artists.filter(artist => artist.uri === uri)
        if (is_current_artist.length === 0){
            const top_tracks = await trackServices.getArtistTopTracks(token, uri.substring(15))
            const uris = top_tracks.tracks.map(track => track.uri)
            trackServices.playTrack(token, uris)
        }
        else{
            player.togglePlay()
        }
    }

    return (
        <div className='artistsOnlyContainer'>
            {artists.map(artist => 
                <Link to={`../../artist/${artist.id}`} key={artist.id} className='individualArtist'>
                    {
                        status.track_window.current_track.artists.filter(item => item.uri === artist.uri).length !== 0 ?
                            status.paused ? <FaCirclePlay className='playButton' onClick={() => handlePlay(artist.uri)}/> : <AiOutlinePauseCircle className='playButton' onClick={() => handlePlay(artist.uri)}/>
                            : <FaCirclePlay className='playButton' onClick={() => handlePlay(artist.uri)}/>
                    }
                    <img src={artist.images[0].url}/>
                    <div>{artist.name}</div>
                </Link>
            )}
        </div>
    )
}


ArtistsOnly.propTypes = {
    artists: PropTypes.array.isRequired,
    token: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired
}
export default ArtistsOnly