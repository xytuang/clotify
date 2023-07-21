import PropTypes from 'prop-types'

const SongDetails = ({current_track}) => {
    return (
        <div className='footer-left'>
            <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />
            <div>
                <div className="now-playing__name">{ current_track.name }</div>
                <div className="now-playing__artist">{ current_track.artists[0].name }</div>
            </div>
        </div>
    )
}

SongDetails.propTypes = {
    current_track: PropTypes.object.isRequired
}

export default SongDetails