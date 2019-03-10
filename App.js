// import React from 'react';
// import {
//   ActivityIndicator,
//   Button,
//   Clipboard,
//   FlatList,
//   Image,
//   Share,
//   StyleSheet,
//   Text,
//   ScrollView,
//   View,
// } from 'react-native';
// import { ImagePicker, Permissions } from 'expo';
// import uuid from 'uuid';
// import Environment from './config/environment';
// import firebase from './config/firebase';

// export default class App extends React.Component {
//   state = {
//     image: null,
//     uploading: false,
//     googleResponse: null,
//   };

//   async componentDidMount() {
//     await Permissions.askAsync(Permissions.CAMERA_ROLL);
//     await Permissions.askAsync(Permissions.CAMERA);
//   }

//   render() {
//     let { image } = this.state;

//     return (
//       <View style={styles.container}>
//         <ScrollView
//           style={styles.container}
//           contentContainerStyle={styles.contentContainer}
//         >
//           <View style={styles.getStartedContainer}>
//             {image ? null : (
//               <Text style={styles.getStartedText}>Google Cloud Vision</Text>
//             )}
//           </View>

//           <View style={styles.helpContainer}>
//             <Button
//               onPress={this._pickImage}
//               title="Pick an image from camera roll"
//             />

//             <Button onPress={this._takePhoto} title="Take a photo" />
//             {this.state.googleResponse && (
//               <FlatList
//                 data={this.state.googleResponse.responses[0].labelAnnotations}
//                 extraData={this.state}
//                 keyExtractor={this._keyExtractor}
//                 renderItem={({ item }) => <Text>Item: {item.description}</Text>}
//               />
//             )}
//             {this._maybeRenderImage()}
//             {this._maybeRenderUploadingOverlay()}
//           </View>
//         </ScrollView>
//       </View>
//     );
//   }

//   organize = array => {
//     return array.map(function(item, i) {
//       return (
//         <View key={i}>
//           <Text>
//             {item} {(key = item.id)}
//           </Text>
//         </View>
//       );
//     });
//   };

//   _maybeRenderUploadingOverlay = () => {
//     if (this.state.uploading) {
//       return (
//         <View
//           style={[
//             StyleSheet.absoluteFill,
//             {
//               backgroundColor: 'rgba(0,0,0,0.4)',
//               alignItems: 'center',
//               justifyContent: 'center',
//             },
//           ]}
//         >
//           <ActivityIndicator color="#fff" animating size="large" />
//         </View>
//       );
//     }
//   };

//   _maybeRenderImage = () => {
//     let { image, googleResponse } = this.state;
//     if (!image) {
//       return;
//     }

//     let description = null;
//     if (googleResponse)
//       description = googleResponse.responses[0].textAnnotations[0].description.replace(
//         /\s+$/,
//         ''
//       );
//     return (
//       <View
//         style={{
//           marginTop: 20,
//           width: 250,
//           borderRadius: 3,
//           elevation: 2,
//         }}
//       >
//         <Button
//           style={{ marginBottom: 10 }}
//           onPress={() => this.submitToGoogle()}
//           title="Analyze!"
//         />

//         <View
//           style={{
//             borderTopRightRadius: 3,
//             borderTopLeftRadius: 3,
//             shadowColor: 'rgba(0,0,0,1)',
//             shadowOpacity: 0.2,
//             shadowOffset: { width: 4, height: 4 },
//             shadowRadius: 5,
//             overflow: 'hidden',
//           }}
//         >
//           <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
//         </View>
//         <Text
//           onPress={this._copyToClipboard}
//           onLongPress={this._share}
//           style={{ paddingVertical: 10, paddingHorizontal: 10 }}
//         />

//         <Text>Raw JSON:</Text>
//         {description && (
//           <Text
//             onPress={this._copyToClipboard}
//             onLongPress={this._share}
//             style={{ paddingVertical: 10, paddingHorizontal: 10 }}
//           >
//             {description}
//           </Text>
//         )}
//       </View>
//     );
//   };

//   _keyExtractor = (item, index) => item.id;

//   _renderItem = item => {
//     <Text>response: {JSON.stringify(item)}</Text>;
//   };

//   _share = () => {
//     Share.share({
//       message: JSON.stringify(this.state.googleResponse.responses),
//       title: 'Check it out',
//       url: this.state.image,
//     });
//   };

//   _copyToClipboard = () => {
//     Clipboard.setString(this.state.image);
//     alert('Copied to clipboard');
//   };

//   _takePhoto = async () => {
//     let pickerResult = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });

//     this._handleImagePicked(pickerResult);
//   };

//   _pickImage = async () => {
//     let pickerResult = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });

//     this._handleImagePicked(pickerResult);
//   };

//   _handleImagePicked = async pickerResult => {
//     try {
//       this.setState({ uploading: true });

//       if (!pickerResult.cancelled) {
//         uploadUrl = await uploadImageAsync(pickerResult.uri);
//         this.setState({ image: uploadUrl });
//       }
//     } catch (e) {
//       console.log(e);
//       alert('Upload failed, sorry :(');
//     } finally {
//       this.setState({ uploading: false });
//     }
//   };

//   submitToGoogle = async () => {
//     try {
//       this.setState({ uploading: true });
//       let { image } = this.state;
//       let body = JSON.stringify({
//         requests: [
//           {
//             features: [
//               { type: 'LABEL_DETECTION', maxResults: 10 },
//               { type: 'LANDMARK_DETECTION', maxResults: 5 },
//               { type: 'FACE_DETECTION', maxResults: 5 },
//               { type: 'LOGO_DETECTION', maxResults: 5 },
//               { type: 'TEXT_DETECTION', maxResults: 5 },
//               { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
//               { type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
//               { type: 'IMAGE_PROPERTIES', maxResults: 5 },
//               { type: 'CROP_HINTS', maxResults: 5 },
//               { type: 'WEB_DETECTION', maxResults: 5 },
//             ],
//             image: {
//               source: {
//                 imageUri:
//                   'https://www.glutenfreefollowme.com/wp-content/uploads/2017/06/Jacks-Wife-Freda-288x219.png',
//               },
//             },
//           },
//         ],
//       });
//       let response = await fetch(
//         'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCLgmQWPMg2Q_PJuzYO2vILWTnmOBLZ_0I',
//         {
//           method: 'POST',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },

//           body: body,
//         }
//       );
//       let responseJson = await response.json();
//       // console.log(responseJson);
//       this.setState({
//         googleResponse: responseJson,
//         uploading: false,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

// // const yelpConfig = {
// //   headers: {
// //     Authorization:
// //       'Bearer NEeaAtk4wztYxtmEmGECM2H8HKNpaj7Fu5kbzWvUkt49n66H2W5NsZI2hfZP5fVp9dEb33lHst7zYpqR48vpG31LbNNQOZmM1BnijmBaawXrqoY3QC-UKOPz24uBXHYx',
// //   },
// //   params: {
// //     name: "JACK'S WIFE FREDA",
// //     address1: '50 Carmine St',
// //     city: 'NYC',
// //     state: 'NY',
// //     country: 'US',
// //   },
// // };

// // submitToYelp = async () => {
// //   try {
// //     this.setState({ uploading: true });
// //     let { image } = this.state;
// //     let body = JSON.stringify({
// //       params: {
// //         name: "JACK'S WIFE FREDA",
// //         address1: '50 Carmine St',
// //         city: 'NYC',
// //         state: 'NY',
// //         country: 'US',
// //       },
// //     });
// //     let yelpResponse = await fetch(
// //       'https://api.yelp.com/v3/businesses/matches',
// //       yelpConfig,
// //       {
// //         method: 'GET',
// //         headers: {
// //           Accept: 'application/json',
// //           'Content-Type': 'application/json',
// //         },
// //       }
// //     );
// //     let yelpResponseJson = await response.json();
// //     // console.log(responseJson);
// //     this.setState({
// //       googleResponse: responseJson,
// //       uploading: false,
// //       yelpJSON: yelpResponse,
// //     });
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// //upload to firebase~~~~~~~~~
// async function uploadImageAsync(uri) {
//   const blob = await new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//       resolve(xhr.response);
//     };
//     xhr.onerror = function(e) {
//       console.log(e);
//       reject(new TypeError('Network request failed'));
//     };
//     xhr.responseType = 'blob';
//     xhr.open('GET', uri, true);
//     xhr.send(null);
//   });

//   const ref = firebase
//     .storage()
//     .ref()
//     .child(uuid.v4());
//   const snapshot = await ref.put(blob);

//   blob.close();

//   return await snapshot.ref.getDownloadURL();
// }
// //style ~~~~~~~~~~~~~
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingBottom: 10,
//   },
//   developmentModeText: {
//     marginBottom: 20,
//     color: 'rgba(0,0,0,0.4)',
//     fontSize: 14,
//     lineHeight: 19,
//     textAlign: 'center',
//   },
//   contentContainer: {
//     paddingTop: 30,
//   },

//   getStartedContainer: {
//     alignItems: 'center',
//     marginHorizontal: 50,
//   },

//   getStartedText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     lineHeight: 24,
//     textAlign: 'center',
//   },

//   helpContainer: {
//     marginTop: 15,
//     alignItems: 'center',
//   },
// });

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  FlatList,
  Image,
  Share,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import Environment from './config/environment';
import firebase from './config/firebase';

export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
    googleResponse: null,
    yelpResponse: {},
  };

  async componentDidMount() {
    console.log('hello');
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {/* if image, render image, if not, render Google Cloud Vision */}
          <View style={styles.getStartedContainer}>
            {image ? null : (
              <Text style={styles.getStartedText}>Snap Before You Eat</Text>
            )}
          </View>

          <View style={styles.helpContainer}>
            <Button
              onPress={this._pickImage}
              title="Pick an image from camera roll"
            />

            <Button onPress={this._takePhoto} title="Take a photo" />
            {this.state.googleResponse && (
              <FlatList
                data={this.state.googleResponse.responses[0].labelAnnotations}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => <Text>Item: {item.description}</Text>}
              />
            )}
            {this._maybeRenderImage()}
            {this._maybeRenderUploadingOverlay()}
          </View>
        </ScrollView>
      </View>
    );
  }

  organize = array => {
    return array.map(function(item, i) {
      return (
        <View key={i}>
          <Text>
            {item} {(key = item.id)}
          </Text>
        </View>
      );
    });
  };

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image, googleResponse } = this.state;
    if (!image) {
      return;
    }

    let description = null;
    if (googleResponse)
      description = googleResponse.responses[0].textAnnotations[0].description.replace(
        /\s+$/,
        ''
      );
    return (
      <View
        style={{
          marginTop: 20,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}
      >
        <Button
          style={{ marginBottom: 10 }}
          onPress={this.analyzeImage}
          title="Do I want to eat here?"
        />

        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}
        >
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
        />

        {/* <Text>Name of restaurant: Jack's Wife Freda </Text>
        <Text>Reviews:</Text>
        <Text>
          1. Yum! Really enjoyed our brunch here. We were in town and brunched
          here on a Monday.
        </Text>
        <Text>
          2. Most people come for brunch (which is amazin) but definitely try
          their dinner menu too!
        </Text>
        <Text>
          3. There is usually a wait for brunch on the weekends, but it's well
          worth it. Try to get there early!
        </Text> */}
        {description && (
          <Text
            onPress={this._copyToClipboard}
            onLongPress={this._share}
            style={{ paddingVertical: 10, paddingHorizontal: 10 }}
          >
            {description} {this.state.yelpResponse.phoneNumber}
            {this.state.yelpResponse.address}
          </Text>
        )}
      </View>
    );
  };

  // _keyExtractor = (item, index) => item.id;

  // _renderItem = item => {
  //   <Text>response: {JSON.stringify(item)}</Text>;
  // };

  _share = () => {
    Share.share({
      message: JSON.stringify(this.state.googleResponse.responses),
      title: 'Check it out',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };

  analyzeImage = async () => {
    const restaurant = await this.submitToGoogle();
    await this.submitToYelp(restaurant);
  };

  submitToGoogle = async () => {
    try {
      this.setState({ uploading: true });
      let { image } = this.state;
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: 'LABEL_DETECTION', maxResults: 10 },
              { type: 'LOGO_DETECTION', maxResults: 5 },
              { type: 'TEXT_DETECTION', maxResults: 5 },
              { type: 'IMAGE_PROPERTIES', maxResults: 5 },
            ],
            image: {
              source: {
                imageUri:
                  'https://www.glutenfreefollowme.com/wp-content/uploads/2017/06/Jacks-Wife-Freda-288x219.png',
              },
            },
          },
        ],
      });
      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCLgmQWPMg2Q_PJuzYO2vILWTnmOBLZ_0I',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          body: body,
        }
      );
      let responseJson = await response.json();
      console.log('Google response', responseJson);
      this.setState({
        googleResponse: responseJson,
        uploading: false,
      });
      //this will give me the name from the google response
      return responseJson.responses[0].textAnnotations[0].description.replace(
        /\s+$/,
        ''
      );
    } catch (error) {
      console.log('google error', error);
    }
  };
  submitToYelp = async restaurant => {
    let yelpResponse;
    const yelpConfig = {
      headers: {
        Authorization:
          'Bearer NEeaAtk4wztYxtmEmGECM2H8HKNpaj7Fu5kbzWvUkt49n66H2W5NsZI2hfZP5fVp9dEb33lHst7zYpqR48vpG31LbNNQOZmM1BnijmBaawXrqoY3QC-UKOPz24uBXHYx',
      },
    };

    try {
      let yelpResponse = await fetch(
        "https://api.yelp.com/v3/businesses/matches?name=Jack's+Wife+Freda&address1=50+Carmine+St&city=NYC&state=NY&country=US",
        yelpConfig,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      let yelpResponseJson = await yelpResponse.json();
      const phoneNumber = yelpResponseJson.businesses[0].display_phone;
      const address = yelpResponseJson.businesses[0].location.display_address;
      // console.log(responseJson);
      this.setState({
        yelpResponse: { phoneNumber, address },
      });
      console.log('yelpResponse', yelpResponseJson);
    } catch (error) {
      console.log('yelp error', error);
    }
  };
}

//upload to firebase~~~~~~~~~
async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
}
//style ~~~~~~~~~~~~~
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },

  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },

  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },

  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
});
