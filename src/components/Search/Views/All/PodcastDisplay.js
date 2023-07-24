import PropTypes from 'prop-types'
import './basicDisplay.css'

const PodcastDisplay = ({podcasts}) => {
    return (
        <div>
            <h4>Podcasts</h4>
            <div className='containerSearchResult'>
                {podcasts.map(podcast => 
                    <div key={podcast.id} className='individualItem'>
                        <img src={podcast.images[0].url}/>
                        <div>{podcast.name}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

PodcastDisplay.propTypes = {
    podcasts: PropTypes.array.isRequired,
}

export default PodcastDisplay