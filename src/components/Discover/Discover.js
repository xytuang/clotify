import PropTypes from 'prop-types'
import './discover.css'

const Discover = ({madeFor}) => {
    return (
        <div>
            <div>Made for</div>
            <div className='discover'>{madeFor.map(song => <div key={song}>{song}</div>)}</div>
        </div>
    )
    
}

Discover.propTypes = {
    madeFor: PropTypes.array.isRequired
}

export default Discover