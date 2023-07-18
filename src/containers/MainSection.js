import Discover from '../components/Discover/Discover'
import RecentlyPlayed from '../components/RecentlyPlayed/RecentlyPlayed'

const MainSection = () => {
    const recentlyPlayed = ['song 1', 'song 2', 'song 3', 'song 4', 'song 5', 'song 6']
    const madeFor = ['daily mix 1', 'daily mix 2', 'daily mix 3', 'daily mix 4', 'daily mix 5']
    return (
        <div className='mainSection'>
            <RecentlyPlayed recentlyPlayed={recentlyPlayed}/>
            <Discover madeFor={madeFor}/>
        </div>
    )

}

export default MainSection