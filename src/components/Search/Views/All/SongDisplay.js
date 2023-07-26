import PropTypes from 'prop-types'
import './SongDisplay.css'
import FormattedTime from '../../../Footer/components/FormattedTime'
import { Link } from 'react-router-dom'
import { RxTriangleRight } from 'react-icons/rx'
import { AiOutlinePauseCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const SongDisplay = ({songs, handlePlay}) => {
    const status = useSelector(state => state.status.status)
    
    return (
        <div>
            <h4>Songs</h4>
            {songs.map(song => 
                <div key={song.id} className='songsSearchResult'>
                    <img className='songSearchResultImg' src={song.album.images[2].url}/>
                    <span className='onHoverPlay'>
                        {
                            song.uri === status.track_window.current_track.uri ? 
                                status.paused ? <RxTriangleRight onClick={() => handlePlay(song.uri)}/> : <AiOutlinePauseCircle onClick={() => handlePlay(song.uri)}/>
                                : <RxTriangleRight onClick={() => handlePlay(song.uri)}/>
                        }
                    </span>
                    <div className='oneSongSearchResult'>
                        <div>
                            {song.name}
                            {song.artists.map(artist => <div  key={artist.id}><Link className='text-link' to={`../artist/${artist.id}`}>{artist.name}</Link></div>)}
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