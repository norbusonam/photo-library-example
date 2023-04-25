/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Dimensions, FlatList, Image, SafeAreaView, Text} from 'react-native';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';

function App(): JSX.Element {
  const [images, setImages] = React.useState<PhotoIdentifier[]>([]);
  const imageSideLength = Dimensions.get('screen').width / 3;

  React.useEffect(() => {
    getImages();
  }, []);

  // get all user images
  const getImages = async () => {
    const {edges} = await CameraRoll.getPhotos({
      first: 1000,
      assetType: 'Photos',
    });
    setImages(edges);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>{images.length} images</Text>
      <FlatList
        data={images}
        numColumns={3}
        renderItem={({item}) => (
          <Image
            source={{uri: item.node.image.uri}}
            style={{
              width: imageSideLength,
              height: imageSideLength,
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}

export default App;
