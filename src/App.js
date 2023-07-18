import { useState, useEffect } from 'react'
import Login from './components/Login'
import './index.css'
import WebPlayback from './components/Webplayback'

const App = () =>  {
    const [token, setToken] = useState('')

    useEffect(() => {
        async function getToken(){
            const response = await fetch('/auth/token')
            const json = await response.json()
            
            setToken(json.access_token)
        }
        getToken()
    }, [])
    return (
        <div className='app'>
            {(token === '') ? <Login/> : <WebPlayback token={token}/>}
        </div>
    )
}

export default App
