/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import { RNPhotoEditor } from 'react-native-photo-editor';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-crop-picker';

class App extends React.Component {
  state = {
    uri: null,
    type: 'image',
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
    this.setState({ uri: null });
    ImagePicker.openPicker({}).then(image => {
      console.log(image);
      const path = image.path.replace(/(file|content):\/\//, '');
      console.warn('Path', path);
      const type = image.mime.split('/')[0]
      // this.setState({ type })
      if (type === 'video') {
        //return this.setState({ uri: image.path })
      }
      RNPhotoEditor({
        onCancel: this.onCancel,
        onDone: ({ imagePath }) => {
          console.warn('args', imagePath);
          this.setState({ uri: `file://${imagePath}` });
          this.forceUpdate();
        },
        colors: this.colors,
        path,
        width: image.width,
        height: image.height,
        editedImageDirectory: 'OTU chat/edited',
      });
    });
  };

  render() {
    console.warn(this.state.type === 'image' && this.state.uri)
    return (
      <View style={styles.container}>
        {this.state.type === 'image' && this.state.uri && (
          <Image
            source={{ uri: this.state.uri }}
            style={{ width: 500, height: 500 }}
          />
        )}
        {this.state.type === 'video' && this.state.uri && (
          <Video source={{ uri: this.state.uri }}   // Can be a URL or a local file.                                // Store reference
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0
            }} />
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
