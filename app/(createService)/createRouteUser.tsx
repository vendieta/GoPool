import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// Asegúrate de tener la clave de Mapbox (reemplázala con tu propia clave)
mapboxgl.accessToken = 'pk.eyJ1IjoicnViYWxlb24iLCJhIjoiY203YmF6dndpMDBmYTJpcTQ1eXNpbHF3OSJ9.xEl-Znia51osA8kaRkQj6g';

const CreateRoute = () => {
  useEffect(() => {
    // Crear el mapa después de que el componente se monte
    const map = new mapboxgl.Map({
      container: 'map', // ID del div que contendrá el mapa
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-0.09, 51.505], // Coordenadas iniciales (longitud, latitud)
      zoom: 13, // Nivel de zoom
    });

    // Añadir un marcador
    new mapboxgl.Marker()
      .setLngLat([-0.09, 51.505])
      .addTo(map);

    // Limpiar el mapa cuando el componente se desmonte
    return () => map.remove();
  }, []);

  return (
    <div style={styles.container}>
      <div id="map" style={styles.map}></div>
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    flex: 1,
    height: '100vh', // Hacer que el contenedor ocupe toda la altura de la ventana
    width: '100%', // Asegurarse de que ocupe todo el ancho de la ventana
  },
  map: {
    width: '100%', // El mapa ocupará todo el ancho disponible
    height: '100%', // El mapa ocupará toda la altura del contenedor
  },
};



export default CreateRoute;
