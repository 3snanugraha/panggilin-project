import * as Linking from 'expo-linking';

export const linking = {
  prefixes: ['panggilin://', 'https://panggilin.artadev.my.id'], // Simplify prefixes
  config: {
    screens: {
      verify: 'verify', // Directly link to the verify screen
      '(auth)': {
        screens: {
          login: 'login',
          register: 'register'
        }
      }
    }
  },

  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }
    return null;
  },

  subscribe(listener: (url: string | null) => void) {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });
    return () => {
      subscription.remove();
    };
  }
};
