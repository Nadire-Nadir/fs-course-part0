const Notification = ({ message, errorMessage }) => {

    return (
        <>
            {message &&
                <div className="notification message">
                    {message}
                </div>
            }
            
            {errorMessage && 
                <div className="notification error">
                    {errorMessage}
                </div>
            }
        </>
    )
}

export default Notification;