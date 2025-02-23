import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const [isSubscribed, setIsSubscribed] = useState(false);

  // Check for required permissions and APIs
  const checkPermissions = () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error("No support for service worker!");
    }

    if (!('Notification' in window)) {
      throw new Error("No support for Notification API");
    }

    if (!('PushManager' in window)) {
      throw new Error("No support for Push API");
    }
  };

  // Register service worker
  const registerServiceWorker = async () => {
    const registration = await navigator.serviceWorker.register('/service-worker.js');
    return registration;
  };

  // Request notification permission
  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error("Notification permission not granted");
    } else {
      const registration = await registerServiceWorker();  // Register service worker
      console.log('Service Worker registered with scope:', registration.scope);
      setIsSubscribed(true);
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  const handleSubscribe = async () => {
    try {
      if (isSubscribed) {
        // Unsubscribe logic
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          await registration.unregister();  // Unregister the service worker
          console.log('Service Worker unregistered');
        }
        setIsSubscribed(false);  // Update subscription state
      } else {
        // Subscribe logic
        await requestNotificationPermission();

        const registration = await registerServiceWorker();  // Register service worker
        console.log('Service Worker registered with scope:', registration.scope);

        // Wait for the service worker to be ready and then subscribe to push notifications
        // const activeRegistration = await navigator.serviceWorker.ready;
        // await subscribeToPushNotifications(activeRegistration);
        setIsSubscribed(true);  // Update subscription state
      }
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <>
      <div>
        <p>Updated Code 5 (Final - Final - Final)</p>
        <p>{isSubscribed ? "You are subscribed to notifications" : "You are not subscribed to notifications"}</p>
        <button onClick={handleSubscribe}>{isSubscribed ? "Unsubscribe" : "Subscribe"}</button>
      </div>
    </>
  )
}

export default App
