import { useState, useEffect } from 'react'
import Login from './components/Login'
import './index.css'
import WebPlayback from './Webplayback'

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
    console.log(token)
    return (
        <div>
            {(token === '') ? <Login/> : <WebPlayback token={token}/>}
        </div>
    )
}

export default App
