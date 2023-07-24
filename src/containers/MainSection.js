
import PropTypes from 'prop-types'
import MostPlayed from '../components/RecentlyPlayed/MostPlayed'
import Search from '../components/Search/Search'
import { Routes, Route } from 'react-router-dom'
import IndividualAlbum from '../components/IndividualAlbum/IndividualAlbum'


const MainSection = ({player, token}) => {

    return (
        <div>
            <Routes>
                <Route path='/' element={<MostPlayed token={token}/>}/>
                <Route path='/:id' element ={<IndividualAlbum player={player} token={token}/>}/>
                <Route path='/search' element={<Search token={token}/>}/>
            </Routes>
        </div>
    )
}

MainSection.propTypes = {
    player: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired
}


export default MainSection