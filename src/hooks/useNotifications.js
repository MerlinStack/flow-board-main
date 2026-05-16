import { useEffect } from 'react'

export function useNotifications() {
  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications')
      return false
    }
    
    if (Notification.permission === 'granted') {
      return true
    }
    
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }
    
    return false
  }

  const sendNotification = async (title, options = {}) => {
    const hasPermission = await requestPermission()
    
    if (hasPermission && document.visibilityState !== 'visible') {
      new Notification(title, {
        icon: '/vite.svg',
        ...options,
      })
    }
  }

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      requestPermission()
    }
  }, [])

  return { sendNotification, requestPermission }
}