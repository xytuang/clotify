// import { useState } from 'react'
import PropTypes from 'prop-types'
import Discover from '../components/Discover/Discover'
import RecentlyPlayed from '../components/RecentlyPlayed/RecentlyPlayed'
import { useSelector } from 'react-redux'


const Home = ({show}) => {
    const recentlyPlayed = ['song 1', 'song 2', 'song 3', 'song 4', 'song 5', 'song 6']
    const madeFor = ['daily mix 1', 'daily mix 2', 'daily mix 3', 'daily mix 4', 'daily mix 5']
    if (show !== 'home'){
        return (
            <div>
            </div>
        )
    }
    return (
        <div className='mainSection'>
            <RecentlyPlayed recentlyPlayed={recentlyPlayed}/>
            <Discover madeFor={madeFor}/>
        </div>
    )
}

const Search = ({show}) => {
    if (show !== 'search'){
        return (
            <div>
            </div>
        )
    }
    return (
        <input placeholder='What do you want to listen to?'/>
    )
}


const MainSection = () => {
    const uiView = useSelector(state => state.uiView)

    return (
        <div>
            <Home show={uiView.view}/>
            <Search show={uiView.view}/>
        </div>
    )

}

Home.propTypes = {
    show: PropTypes.string.isRequired
}

Search.propTypes = {
    show: PropTypes.string.isRequired
}

export default MainSection