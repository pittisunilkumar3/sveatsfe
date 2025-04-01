import { initializeApp, getApps, getApp } from 'firebase/app'
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
} from 'firebase/messaging'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyByjF7drAKV4pnzpXlmBywd8w2uGe2UB6Y",
  authDomain: "sveats-50fbd.firebaseapp.com",
  databaseURL: "https://sveats-50fbd-default-rtdb.firebaseio.com",
  projectId: "sveats-50fbd",
  storageBucket: "sveats-50fbd.appspot.com",
  messagingSenderId: "732900158143",
  appId: "1:732900158143:web:da38704ecc3b79eb42b40a",
  measurementId: "G-XQF6VB7K39"
}
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const messaging = (async () => {
    try {
        const isSupportedBrowser = await isSupported()
        if (isSupportedBrowser) {
            return getMessaging(firebaseApp)
        }

        return null
    } catch (err) {
        return null
    }
})()

export const fetchToken = async (setFcmToken) => {
    return getToken(await messaging, {
        vapidKey: '',
    })
        .then((currentToken) => {
            if (currentToken) {
                setFcmToken(currentToken)
            } else {
                setFcmToken()
            }
        })
        .catch((err) => {
            console.error(err)
        })
}

export const onMessageListener = async () =>
    new Promise((resolve) =>
        (async () => {
            const messagingResolve = await messaging
            onMessage(messagingResolve, (payload) => {
                resolve(payload)
            })
        })()
    )
export const auth = getAuth(firebaseApp)
