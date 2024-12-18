import { Dimensions, TextStyle, ViewStyle, ImageStyle } from 'react-native';

const { width, height } = Dimensions.get('window');

export const theme = {
  colors: {
    primary: '#7E57C2',
    primaryDark: '#5d379e',
    white: '#FFFFFF',
    black: '#000000',
    shadow: 'rgba(0, 0, 0, 0.5)',
    primarybgglass: 'rgba(255, 255, 255, 0.2)',
  },

  gradients: {
    primary: ['#5d379e', '#7E57C2'] as const,
  },

  typography: {
    title: {
      fontSize: 34,
      fontWeight: 'bold' as const,
      color: '#FFFFFF',
    } as TextStyle,
    description: {
      fontSize: 16,
      color: '#FFFFFF',
      textAlign: 'center' as const,
    } as TextStyle,
    button: {
      fontSize: 16,
      fontWeight: 'bold' as const,
      color: '#7E57C2',
    } as TextStyle,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 20,
    xl: 25,
  },

  layout: {
    screenWidth: width,
    screenHeight: height,
    containerPadding: 16,
  },

  buttons: {
    primary: {
      minWidth: 250,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    } as ViewStyle,
    oauth: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
    } as ViewStyle,
  },

  images: {
    slide: {
      height: 300,
      width: 290,
      resizeMode: 'contain',
    } as ImageStyle,
  },

  containers: {
    centered: {
      flex: 1,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    } as ViewStyle,
    slide: {
      width: width,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    } as ViewStyle,
  }
};

export type Theme = typeof theme;
