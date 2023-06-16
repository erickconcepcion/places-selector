export interface Configuration {
    mapConfiguration: MapConfiguration;
  }
  export interface MapConfiguration {
    initialLat: number;
    initialLong: number;
    initialZoom: number;
    apiKey: string;
  }
  export const appConfigs: Configuration = {
    mapConfiguration: {
      initialLat: 18.477471,
      initialLong: -69.917858,
      initialZoom: 15,
      apiKey: 'AIzaSyCRhvapUdzjtM9l6QdRRgCslNVoeoADUpg',
    },
  };
  