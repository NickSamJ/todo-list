import React, {useEffect} from 'react'
import ErrorBg from '../images/404.jpg'
import classes from './pageStyles.module.css'

const ErrorPage = ({history}) => {

    useEffect(() => {
        document.title = '404 | Page not found'
    }, [])
    return (
        <div className={classes.BlackBg}>
            <img className={classes.BGImg} src={ErrorBg} alt="Unknown page"/>
            <h2 className={classes.ErrorText}>Nothing but squirrel on this page 🤷‍♂️ </h2>
            <button onClick={() => history.push('/logout')}> Go somewhere!</button>
        </div>
    )
}

export default ErrorPage