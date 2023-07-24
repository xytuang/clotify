import PropTypes from 'prop-types'
import './SongDisplay.css'
import FormattedTime from '../Footer/components/FormattedTime'

const SongDisplay = ({songs, handlePlay}) => {
    return (
        <div>
            <h4>Songs</h4>
            {songs.map(song => 
                <div key={song.id} className='songsSearchResult'>
                    <img src={song.album.images[2].url}/>
                    <div className='oneSongSearchResult'>
                        <div onClick={() => handlePlay(song.uri)}>
                            {song.name}
                            {song.artists.map(artist => <div key={artist.id}>{artist.name}</div>)}
                        </div>
                        <FormattedTime numSeconds={song.duration_ms/1000}/>
                    </div>
                </div>
            )}
        </div>
    )
}

SongDisplay.propTypes = {
    songs: PropTypes.array.isRequired,
    handlePlay: PropTypes.func.isRequired
}

export default SongDisplay