import React, { useEffect, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';  // Asegúrate de que los estilos de Leaflet estén importados

const MapComponent = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Asegurarse de que solo se ejecute en el navegador
    if (typeof window !== 'undefined' && !mapLoaded) {
      // Inicializar el mapa solo cuando el componente se monte en el navegador
      const map = L.map('map').setView([51.505, -0.09], 13);  // Coordenadas de inicio

      // Agregar capa de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Agregar un marcador en el centro del mapa
      L.marker([51.505, -0.09]).addTo(map).bindPopup('Un marcador').openPopup();

      // Cambiar estado para indicar que el mapa se ha cargado
      setMapLoaded(true);

      // Limpiar cuando el componente se desmonte
      return () => {
        map.remove();
      };
    }
  }, [mapLoaded]);

  return (
    <div id="map" style={{ height: '100vh', width: '100%' }}></div>
  );
};

export default MapComponent;
