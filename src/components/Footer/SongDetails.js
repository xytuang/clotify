import PropTypes from 'prop-types'
import LikeButton from '../Buttons/LikeButton/LikeButton'

const SongDetails = ({current_track, token}) => {
    return (
        <div className='footer-left'>
            <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />
            <div>
                <div className="now-playing__name">{ current_track.name }</div>
                <div className="now-playing__artist">{ current_track.artists[0].name }</div>
                <LikeButton token={token} uri={current_track.uri}/>
            </div>
        </div>
    )
}

SongDetails.propTypes = {
    current_track: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired
}

export default SongDetails