import { useState, useEffect } from "react";
import * as Location from "expo-location";

interface Coordinate {
  latitude: number;
  longitude: number;
}

export function useLocation() {
  const [location, setLocation] = useState<Coordinate | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      try {
        // Obtener la última ubicación rápida
        let lastLocation = await Location.getLastKnownPositionAsync({});
        if (lastLocation) {
          setLocation({
            latitude: lastLocation.coords.latitude,
            longitude: lastLocation.coords.longitude,
          });
        }

        // Obtener la ubicación en tiempo real
        let currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Lowest, // Obtener rápido algo
        });

        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        // // Mantener la ubicación actualizada en segundo plano
        // const subscription = await Location.watchPositionAsync(
        //   {
        //     accuracy: Location.Accuracy.High, // Ahora pedimos más precisión
        //     timeInterval: 5000, // Actualiza cada 5 segundos
        //     distanceInterval: 10, // Solo actualiza si el usuario se mueve 10m
        //   },
        //   (newLocation) => {
        //     setLocation({
        //       latitude: newLocation.coords.latitude,
        //       longitude: newLocation.coords.longitude,
        //     });
        //   }
        // );

        // return () => subscription.remove(); // Limpieza al desmontar
      } catch (error) {
        setError("Error fetching location");
      }
    })();
  }, []);

  return { location, error };
}
