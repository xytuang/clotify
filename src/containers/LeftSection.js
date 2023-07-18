import { TiHome } from 'react-icons/ti'
import {FaMagnifyingGlass} from 'react-icons/fa6'
import { BiLibrary } from 'react-icons/bi'

const LeftSection = () => {
    return (
        <div>
            <div>
                <div><TiHome/>Home</div>
                <div><FaMagnifyingGlass/>Search</div>
            </div>
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