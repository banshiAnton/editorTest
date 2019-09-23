/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Button, StyleSheet, Image} from 'react-native';
import {RNPhotoEditor} from 'react-native-photo-editor';
import ImagePicker from 'react-native-image-crop-picker';

class App extends React.Component {
  state = {
    photo: null,
  };

  colors = [
    '#000000',
    '#808080',
    '#a9a9a9',
    '#FFFFFF',
    '#0000ff',
    '#00ff00',
    '#ff0000',
    '#ffff00',
    '#ffa500',
    '#800080',
    '#00ffff',
  ];

  onCancel = (...args) => console.warn('onCancel', args);

  open = () => {
    this.setState({photo: null});
    ImagePicker.openPicker({}).then(image => {
      console.log(image);
      const path = image.path.replace(/(file|content):\/\//, '');
      console.warn('Path', path);
      RNPhotoEditor.Edit({
        onCancel: this.onCancel,
        onDone: () => {
          this.setState({photo: image.path});
          this.forceUpdate();
        },
        colors: this.colors,
        path,
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.photo && (
          <Image source={{uri: this.state.photo}} style={{width: 500, height: 500}} />
        )}
        <Button title="Open" onPress={this.open} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
