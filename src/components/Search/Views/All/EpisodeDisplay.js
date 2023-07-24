import PropTypes from 'prop-types'
import './basicDisplay.css'

const EpisodeDisplay = ({episodes}) => {
    return (
        <div>
            <h4>Episodes</h4>
            <div className='containerSearchResult'>
                {episodes.map(episode => 
                    <div key={episode.id} className='individualItem'>
                        <img src={episode.images[0].url}/>
                        <div>{episode.name}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

EpisodeDisplay.propTypes = {
    episodes: PropTypes.array.isRequired,
}

export default EpisodeDisplay