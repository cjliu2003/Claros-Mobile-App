import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export function useScreenWidth(){
  // By default set the width to be the detected screen width
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window:{width,height}})=>{
      if (width < height) {
        
      } else {
        setScreenWidth(Dimensions.get('window').height)
      }
    })
  }, []);
  console.log(screenWidth);
  return screenWidth;
}

export function useScreenHeight(){
  // By default set the height to be the detected screen height
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window:{width,height}})=>{
      // Only if the currently defined height is greater than the width do we redefine.
      if (width < height) {
        
      } else {
        setScreenHeight(Dimensions.get('window').width)
      }
    })
  }, []);
  console.log(screenHeight);
  return screenHeight;
}