/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Button,
  Platform,
} from "react-native";
import base64 from 'base64-arraybuffer';
import All from "./components/all";

import { captureRef } from "react-native-view-shot";

import Animation from 'lottie-react-native';

import anim from '../assets/soda_loader.json';

class Lottieloader extends Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Lottie Animations :-)</Text>
        <View>
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 80,
              height: 80
            }}
            loop={true}
            source={anim}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A6207E'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  }
});

const opentype = require('opentype.js');

const { width, height } = Dimensions.get("window");

const shadow = require("./components/shadow-min.png");

const font = 'AvenirNextLTPro-Regular';

require('./cycle');

export default class RNSvgTextBug extends Component {
  state = {fontData: null};
  constructor() {
    super();

    const fontPromise = Platform.OS === 'android' ?
      RNFS.readFileAssets(`fonts/${font}.otf`, 'base64') :
      RNFetchBlob.fs.readFile(RNFetchBlob.fs.asset(`fonts/${font}.otf`), 'base64');

    fontPromise
      .then(res => opentype.parse(base64.decode(res)))
      .then(fontData => {
        console.log(fontData);
        this.setState({fontData: JSON.decycle(fontData)});
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <ScrollView
        ref={ref => (this.ref = ref)}
        style={{ backgroundColor: "#ffffff" }}
      >
        <Lottieloader/>
        <All
          View={View}
          width={width}
          height={height}
          native={true}
          shadow={shadow}
          fontData={this.state.fontData}
        />
        <Button
          title="Snapshot"
          onPress={() => {
            captureRef(this.ref, {
              format: "png",
              snapshotContentContainer: true
            }).then(
              uri => console.log("Image saved to", uri),
              error => console.error("Oops, snapshot failed", error)
            );
          }}
        />
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent("newproject", () => RNSvgTextBug);
