import * as Location from 'expo-location';

export const locationService = {
  async getCurrentLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Location permission denied');
    }

    const location = await Location.getCurrentPositionAsync({});
    const address = await this.getAddressFromCoordinates(
      location.coords.latitude,
      location.coords.longitude
    );

    return {
      coordinates: location.coords,
      address
    };
  },

  async getAddressFromCoordinates(latitude: number, longitude: number) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
    );
    const data = await response.json();
    return data.display_name;
  }
};
