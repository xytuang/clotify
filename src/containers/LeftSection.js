import { TiHome } from 'react-icons/ti'
import {FaMagnifyingGlass} from 'react-icons/fa6'
import { BiLibrary } from 'react-icons/bi'
import { Link, Outlet } from 'react-router-dom'

const LeftSection = () => {
    
    return (
        <div>
            <div>
                <Link to='/'><div><TiHome/>Home</div></Link>
                <Link to='/search'><div><FaMagnifyingGlass/>Search</div></Link>
            </div>
            <Outlet/>
            <div>
                <div><BiLibrary/>Your library</div>
                <div>
                    <FaMagnifyingGlass/>
                    <select>
                        <option disabled>Sort by</option>
                        <option>Recents</option>
                        <option>Recently added</option>
                        <option>Alphabetical</option>
                        <option>Creator</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default LeftSection