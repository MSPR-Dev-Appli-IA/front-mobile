import { GeoJSONSourceRaw } from 'mapbox-gl';

export const geojson: GeoJSONSourceRaw = {
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-0.560333537731332, 44.86538953555723]
        },
        properties: {
          title: 'Yucca gloriosa'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-0.5597806031679943, 44.84016273527206]
        },
        properties: {
          title: 'Hibiscus'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-0.565826, 44.834232]
        },
        properties: {
          title: 'Bégonia'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-0.61382, 44.851202]
        },
        properties: {
          title: 'Monstera'
        }
      }
    ]
  }
};
