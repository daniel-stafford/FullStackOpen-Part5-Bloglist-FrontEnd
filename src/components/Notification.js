import React from 'react'
import '../index.css'

const Notification = ( {notification} ) => {
  console.log('notifcation message', notification.message);
  console.log('notifcation type', notification.type);

  if (notification.message === null) {
    return null
  }
  if (notification.type === 'error')
    return <div className='error'>{notification.message}</div>

    if (notification.type === 'success')
    return <div className='success'>{notification.message}</div>
}

export default Notification
