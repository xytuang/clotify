
import PropTypes from 'prop-types'
import MostPlayed from '../components/RecentlyPlayed/MostPlayed'
import Search from '../components/Search'
import { Routes, Route } from 'react-router-dom'
import IndividualAlbum from '../components/IndividualAlbum/IndividualAlbum'

//<Route path='/:id' element={<IndividualAlbum token={token}/>}/>

const MainSection = ({token}) => {

    return (
        <div>
            <Routes>
                <Route path='/' element={<MostPlayed token={token}/>}/>
                <Route path='/:id' element ={<IndividualAlbum token={token}/>}/>
                <Route path='/search' element={<Search token={token}/>}/>
            </Routes>
        </div>
    )
}

MainSection.propTypes = {
    token: PropTypes.string.isRequired
}


export default MainSection