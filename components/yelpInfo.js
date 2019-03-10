// import React, { Component } from 'react';
// import { View, Button, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';
// import { Constants } from 'expo';
// import GetLocation from './GetLocation';

// //need to use the lat/long from the getLocation request as the params in this axios request

// const config = {
//   headers: {
//     Authorization:
//       'Bearer NEeaAtk4wztYxtmEmGECM2H8HKNpaj7Fu5kbzWvUkt49n66H2W5NsZI2hfZP5fVp9dEb33lHst7zYpqR48vpG31LbNNQOZmM1BnijmBaawXrqoY3QC-UKOPz24uBXHYx',
//   },
//   params: {
//     longitude: '-122.424051321456', //this should be long from GetLocation
//     latitude: '37.7614250022004', //this should be lat from GetLocation
//   },
// };

// export default class YeplInfo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       yelpInfo: {},
//       errorMessage: null,
//     };
//   }
//   async componentWillMount() {
//     // const {yelpResponse} = await axios.get('https://api.yelp.com/v3/businesses/search', config)
//     this.setState({ yelpInfo: yelpResponse });
//   }

//   _getYelpInfo = async () => {
//     let { yelpResponse } = await axios.get(
//       'https://api.yelp.com/v3/businesses/search',
//       config
//     );
//     Alert.alert(yelpResponse);

//     this.setState({
//       yelpInfo: yelpResponse,
//     });
//   };

//   render() {
//     if (this.state.yelpInfo) {
//       yelp = JSON.stringify(this.state.yelpInfo);
//     }
//     return (
//       <View style={styles.container}>
//         {/* <Text style={styles.paragraph}>{text}</Text> */}
//         <Button onPress={this._getYelpInfo} title="Get my Yelp Info" />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });
