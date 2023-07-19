import { TiHome } from 'react-icons/ti'
import {FaMagnifyingGlass} from 'react-icons/fa6'
import { BiLibrary } from 'react-icons/bi'

import { setView } from '../reducers/uiReducer'
import { useDispatch } from 'react-redux'

const LeftSection = () => {
    const dispatch = useDispatch()
    const handleClick = (view) => {
        dispatch(setView(view))
    }

    
    return (
        <div>
            <div>
                <div onClick={() => handleClick('home')}><TiHome/>Home</div>
                <div onClick={() => handleClick('search')}><FaMagnifyingGlass/>Search</div>
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