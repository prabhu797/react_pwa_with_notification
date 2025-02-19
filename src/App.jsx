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
    const registration = await navigator.serviceWorker.register('/sw.js');
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

  // Subscribe to push notifications
  // const subscribeToPushNotifications = async (registration) => {
  //   const publicKey = "BPJjDqyAY-3vbBTcOoH4RMX0ztKgTvaQmZFd84AGhi9VDZ8M2Qsj7dzn4gADFvFiy9ZqYy0Rap6zodfNx3HUcgg";
  //   const pushSubscription = await registration.pushManager.subscribe({
  //     userVisibleOnly: true,
  //     applicationServerKey: publicKey  // Use your VAPID public key
  //   });
  //   console.log('Push subscription:', pushSubscription);
  //   // Optionally, you can send this subscription to your backend to save it
  //   // For example, using axios:
  //   // await axios.post('/save-subscription', pushSubscription);
  // };

  useEffect(() => {
    const initialize = async () => {
      checkPermissions();
      await requestNotificationPermission();
    };

    initialize(); // Call the async function inside useEffect
  }, []);



  const handleSubscribe = async () => {
    try {
      // await requestNotificationPermission();

      // const registration = await registerServiceWorker();  // Register service worker
      // console.log('Service Worker registered with scope:', registration.scope);

      // Wait for the service worker to be ready and then subscribe to push notifications
      // const activeRegistration = await navigator.serviceWorker.ready;
      // await subscribeToPushNotifications(activeRegistration);
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <>
      <div>
        <p>Updated Code 4 (Final - Final)</p>
        <p>{isSubscribed ? "You are subscribed to notifications" : "You are not subscribed to notifications"}</p>
        <button onClick={handleSubscribe}>{isSubscribed ? "Unsubscribe" : "Subscribe"}</button>
      </div>
    </>
  )
}

export default App
