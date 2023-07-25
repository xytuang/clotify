
import PropTypes from 'prop-types'
import MostPlayed from '../components/RecentlyPlayed/MostPlayed'
import Search from '../components/Search/Search'
import { Routes, Route } from 'react-router-dom'
import IndividualAlbum from '../components/IndividualAlbum/IndividualAlbum'
import IndividualArtist from '../components/IndividualArtist/IndividualArtist'
import IndividualPlaylist from '../components/IndividualPlaylist/IndividualPlaylist'


const MainSection = ({player, token}) => {

    return (
        <div>
            <Routes>
                <Route path='/' element={<MostPlayed token={token}/>}/>
                <Route path='/album/:id' element ={<IndividualAlbum player={player} token={token}/>}/>
                <Route path='/artist/:id' element ={<IndividualArtist player={player} token={token}/>}/>
                <Route path='/playlist/:id' element ={<IndividualPlaylist player={player} token={token}/>}/>
                <Route path='/search/*' element={<Search token={token} player={player}/>}/>
            </Routes>
        </div>
    )
}

MainSection.propTypes = {
    player: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired
}


export default MainSection