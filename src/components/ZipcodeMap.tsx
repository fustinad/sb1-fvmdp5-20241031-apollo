import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { MapComparisonSlider } from './MapComparisonSlider';
import 'leaflet/dist/leaflet.css';
import type { Feature, Geometry } from 'geojson';

interface ZipcodeMapProps {
  data: Array<{
    zipcode: string;
    value: number;
    coordinates: [number, number];
  }>;
  selectedInsight: string | null;
  filters?: Record<string, number>;
  isFiltersApplied?: boolean;
}

function MapUpdater({ data, selectedInsight }: ZipcodeMapProps) {
  const map = useMap();

  useEffect(() => {
    if (data.length > 0) {
      const bounds = data.reduce(
        (acc, item) => acc.extend(item.coordinates),
        map.getBounds()
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [data, map]);

  return null;
}

function MapLayer({ data, filters }: { 
  data: ZipcodeMapProps['data']; 
  filters?: Record<string, number>;
}) {
  const getColor = (value: number) => {
    return value > 80 ? '#1a365d' :
           value > 60 ? '#2563eb' :
           value > 40 ? '#60a5fa' :
           value > 20 ? '#93c5fd' :
                       '#bfdbfe';
  };

  // Apply filters to data
  const filteredData = useMemo(() => {
    if (!filters) return data;

    return data.map(item => ({
      ...item,
      value: Math.min(100, Math.max(0, 
        item.value * (filters.confidenceLevel / 95) * 
        (filters.sampleSize / 1000) * 
        (1 - filters.marginOfError / 100)
      ))
    }));
  }, [data, filters]);

  const geoJsonData: Feature[] = filteredData.map(item => ({
    type: 'Feature',
    properties: {
      zipcode: item.zipcode,
      value: item.value,
    },
    geometry: {
      type: 'Point',
      coordinates: [item.coordinates[1], item.coordinates[0]],
    },
  }));

  const style = (feature: Feature): any => {
    return {
      fillColor: getColor(feature.properties.value),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
    };
  };

  return (
    <GeoJSON
      data={{
        type: 'FeatureCollection',
        features: geoJsonData,
      }}
      style={style}
    />
  );
}

export function ZipcodeMap({ data, selectedInsight, filters, isFiltersApplied }: ZipcodeMapProps) {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapLayer data={data} />
        <MapComparisonSlider>
          <MapLayer 
            data={data} 
            filters={isFiltersApplied ? filters : undefined} 
          />
        </MapComparisonSlider>
        <MapUpdater data={data} selectedInsight={selectedInsight} />
      </MapContainer>
    </div>
  );
}