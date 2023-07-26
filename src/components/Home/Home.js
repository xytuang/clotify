import PropTypes from 'prop-types'
import MostPlayed from '../RecentlyPlayed/MostPlayed'
import Recommendations from '../Recommendations/Recommendations'
import './Home.css'

const Home = ({token}) => {
    return (
        <div className='home'>
            <MostPlayed token={token}/>
            <Recommendations token={token}/>
        </div>
        
    )
}

Home.propTypes = {
    token: PropTypes.string.isRequired
}

export default Home