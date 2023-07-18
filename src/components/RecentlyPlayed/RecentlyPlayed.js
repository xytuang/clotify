import PropTypes from 'prop-types'
import './recentlyplayed.css'

const RecentlyPlayed = ({recentlyPlayed}) => {
    return (
        <div>
            <div>Good Evening</div>
            <div className='recentlyPlayed'>{recentlyPlayed.map(song => <div key={song}>{song}</div>)}</div>
        </div>
    )
    
}

RecentlyPlayed.propTypes = {
    recentlyPlayed: PropTypes.array.isRequired,
}

export default RecentlyPlayed