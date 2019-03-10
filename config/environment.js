//environment.js
var environments = {
  staging: {
    FIREBASE_API_KEY: 'AIzaSyDSPVgWoJPafv3gPXgkyME6Jb_zzLMUZYA',
    FIREBASE_AUTH_DOMAIN: 'myrestaurants-59e6d.firebaseapp.com',
    FIREBASE_DATABASE_URL: 'https://myrestaurants-59e6d.firebaseio.com',
    FIREBASE_PROJECT_ID: 'myrestaurants-59e6d',
    FIREBASE_STORAGE_BUCKET: 'myrestaurants-59e6d.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '47086541077',
    GOOGLE_CLOUD_VISION_API_KEY: 'AIzaSyCLgmQWPMg2Q_PJuzYO2vILWTnmOBLZ_0I',
  },
  production: {
    // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
  },
};

function getReleaseChannel() {
  let releaseChannel = Expo.Constants.manifest.releaseChannel;
  if (releaseChannel === undefined) {
    return 'staging';
  } else if (releaseChannel === 'staging') {
    return 'staging';
  } else {
    return 'staging';
  }
}
function getEnvironment(env) {
  console.log('Release Channel: ', getReleaseChannel());
  return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment;
