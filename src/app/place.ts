export interface PlaceResult {
    results: Place[];
    status: string;
  }
  export interface Place {
    place_id: string;
    name: string;
    geometry: Geometry;
    formatted_address: string;
    types: string[];
  }
  export interface Geometry {
    location: Location;
  }
  export interface Location {
    lat: number;
    lng: number;
  }
  