import { useState } from 'react'
import './RightSection.css'
import { HiUserGroup } from 'react-icons/hi2'

const RightSection = () => {
    const [active, setActive] = useState(false)
    return (
        <div className={active ? 'right' : ''}>
            <HiUserGroup onClick={() => setActive(!active)}/>
            <div className={active ? '' : 'invisible'}>
                Friend activity
            </div>
        </div>
    )
}

export default RightSection