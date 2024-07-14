declare module '@mapbox/mapbox-gl-geocoder' {
    import { IControl } from 'mapbox-gl';
    
    interface GeocoderOptions {
      accessToken: string;
      mapboxgl: typeof mapboxgl;
      placeholder?: string;
      proximity?: mapboxgl.LngLatLike;
      trackProximity?: boolean;
      collapsed?: boolean;
      clearAndBlurOnEsc?: boolean;
      clearOnBlur?: boolean;
      limit?: number;
      localGeocoder?: (query: string) => any;
      reverseMode?: 'distance' | 'score';
      enableEventLogging?: boolean;
      marker?: boolean | mapboxgl.MarkerOptions;
      flyTo?: boolean | mapboxgl.FlyToOptions;
      minLength?: number;
      countries?: string;
      types?: string;
      bbox?: mapboxgl.LngLatBoundsLike;
      filter?: (feature: any) => boolean;
      language?: string;
      zoom?: number;
    }
  
    class MapboxGeocoder implements IControl {
      constructor(options: GeocoderOptions);
      onAdd(map: mapboxgl.Map): HTMLElement;
      onRemove(map: mapboxgl.Map): void;
      setProximity(proximity: mapboxgl.LngLatLike): void;
      getProximity(): mapboxgl.LngLatLike;
      setRenderFunction(renderFunction: (feature: any) => string): void;
      getRenderFunction(): (feature: any) => string;
      setFilterFunction(filterFunction: (feature: any) => boolean): void;
      getFilterFunction(): (feature: any) => boolean;
      clear(): void;
      query(query: string): void;
    }
  
    export default MapboxGeocoder;
  }
  