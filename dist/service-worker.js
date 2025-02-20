const publicKey = "BPJjDqyAY-3vbBTcOoH4RMX0ztKgTvaQmZFd84AGhi9VDZ8M2Qsj7dzn4gADFvFiy9ZqYy0Rap6zodfNx3HUcgg";
const backenURL = "https://pushnotify.novelhouston.com";

const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

const saveSubscription = async (subscription) => {
    console.log("Request URL", `${backenURL}/save-subscription`);
    console.log("subscription data", subscription);
    const response = await fetch(`${backenURL}/save-subscription`, {
        method: 'post',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(subscription)
    });
    console.log("Response from the server", response);
    return response.json();
}

self.addEventListener("activate", async (e) => {
    let key = urlBase64ToUint8Array(publicKey);
    const newSubscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: key
    });
    await saveSubscription(newSubscription);
});

self.addEventListener("push", (event) => {
    const data = event.data.json();  // Parse the JSON payload
    const { title, body, icon } = data;  // Extract title, body, and icon

    // Show the notification with the appropriate data
    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon,  // Path to the icon image
            // Optionally, you can add additional notification options here
            badge: '/assets/images/badge.png',  // Path to a badge (if needed)
            tag: 'push-notification',  // Optional: Adds a unique identifier for the notification
            actions: [
                {
                    action: 'open',
                    title: 'Open',
                },
                {
                    action: 'close',
                    title: 'Close',
                },
            ],
        })
    );
});

