
import PropTypes from 'prop-types'
import Discover from '../components/Discover/Discover'
import MostPlayed from '../components/RecentlyPlayed/MostPlayed'
import Search from '../components/Search'
import { useSelector } from 'react-redux'

const Home = ({show, token}) => {
   
    
    const madeFor = ['daily mix 1', 'daily mix 2', 'daily mix 3', 'daily mix 4', 'daily mix 5']
    if (show !== 'home'){
        return (
            <div>
            </div>
        )
    }
    return (
        <div className='mainSection'>
            <MostPlayed token={token}/>
            <Discover madeFor={madeFor}/>
        </div>
    )
}




const MainSection = ({token}) => {
    const uiView = useSelector(state => state.uiView)

    return (
        <div>
            <Home show={uiView.view} token={token}/>
            <Search show={uiView.view} token={token}/>
        </div>
    )

}

Home.propTypes = {
    show: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
}



MainSection.propTypes = {
    token: PropTypes.string.isRequired
}


export default MainSection