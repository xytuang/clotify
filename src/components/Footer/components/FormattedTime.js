import PropTypes from 'prop-types'

const FormattedTime = ({numSeconds}) => {
    const padZero = digit =>
        `${digit < 10 ? '0' : ''}${digit}`

    const getFormattedTime = () => {
        const hours = Math.floor(numSeconds / 3600)
        const minutes = Math.floor((numSeconds % 3600) / 60)
        const seconds = Math.floor(numSeconds) % 60

        return hours > 0
            ? `${hours}:${padZero(minutes)}:${padZero(seconds)}`
            : `${minutes}:${padZero(seconds)}`
    }

    return (
        <div>
            {getFormattedTime()}
        </div>
    )
    
}

FormattedTime.propTypes = {
    numSeconds: PropTypes.number.isRequired
}

export default FormattedTime