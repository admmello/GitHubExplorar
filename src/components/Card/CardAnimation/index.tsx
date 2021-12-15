import { Roboto_100Thin } from '@expo-google-fonts/roboto';
import React, { useEffect } from 'react';
import { useWindowDimensions, ViewProps } from 'react-native';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { AnimationContainer } from './styles';

interface CardAnimationProps extends ViewProps {
  children: React.ReactNode;
}

export function CardAnimation({ children, ...rest }: CardAnimationProps) {
  const { width: displayWidth } = useWindowDimensions();
  const cardOpacity = useSharedValue(0);
  const cardOffset = useSharedValue(0.25 * displayWidth);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        cardOpacity.value,
        [0, 100],
        [0, 1]
      ),
      transform: [
        {
          translateX: interpolate(
            cardOffset.value,
            [0, 100],
            [2000, 0]
          )
        }
      ]
    }
  })

  useEffect(() => {
    cardOffset.value = withTiming(
      100,
      { duration: 1000 }
    )
    cardOpacity.value = withTiming(
      100,
      { duration: 1000 }
    )
  }, []);

  return (
    <AnimationContainer {...rest} style={animatedStyle}>
      {children}
    </AnimationContainer>
  )
}