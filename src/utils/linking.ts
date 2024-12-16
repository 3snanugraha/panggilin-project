import * as Linking from 'expo-linking';

export const linking = {
  prefixes: ['panggilin://', 'https://panggilin.artadev.my.id'],
  config: {
    screens: {
      '(auth)': {
        screens: {
          verify: {
            path: 'verify',
            parse: {
              token: (token: string) => decodeURIComponent(token),
            },
          }
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
