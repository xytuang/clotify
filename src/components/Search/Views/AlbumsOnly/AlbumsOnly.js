import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { FaCirclePlay } from 'react-icons/fa6'
import { AiOutlinePauseCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import trackServices from '../../../../services/trackServices'

import './AlbumsOnly.css'

const AlbumsOnly = ({albums, token, player}) => {
    const status = useSelector(state => state.status.status)
    

    const handlePlay = async (uri) => {
        const is_current_album = uri === status.track_window.current_track.album.uri
        if (!is_current_album){
            const album = await trackServices.getAlbum(token, uri.substring(14))
            const uris = album.tracks.items.map(item => item.uri)
            trackServices.playTrack(token, uris)
        }
        else{
            player.togglePlay()
        }
    }

    return (
        <div className='albumsOnlyContainer'>
            {albums.map(album => 
                <Link to={`../../album/${album.id}`} key={album.id} className='individualAlbum'>
                    {
                        album.uri === status.track_window.current_track.album.uri ?
                            status.paused ? <FaCirclePlay className='playButton' onClick={() => handlePlay(album.uri)}/> : <AiOutlinePauseCircle className='playButton' onClick={() => handlePlay(album.uri)}/>
                            : <FaCirclePlay className='playButton' onClick={() => handlePlay(album.uri)}/>
                    }
                    <img src={album.images[0].url}/>
                    <div>{album.name}</div>
                </Link>
            )}
        </div>
    )
}


AlbumsOnly.propTypes = {
    albums: PropTypes.array.isRequired,
    token: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired
}
export default AlbumsOnly