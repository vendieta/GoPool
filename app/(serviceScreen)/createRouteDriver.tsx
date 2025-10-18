import PriceInput from "@/components/driver/PriceInput";
import RoutePointsInput from "@/components/driver/RoutePointsInput";
import SeatsInput from "@/components/driver/SeatsInput";
import TimeInput from "@/components/driver/TimeInput";
import Desplegable from "@/components/driver/ZonaSelector";
import { View, Text, StyleSheet, ScrollView, Alert, Image, Dimensions, Platform, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import useStorage from "@/hooks/useStorage";
import CarCard from "@/components/driver/RenderItems";
import AddCar from "@/components/driver/AddCar";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import WeekPicker from "@/components/driver/WeekPicker";
import { combinarFechaYHora } from "@/scripts/compareTime";
import { useTheme } from "@/hooks/useContextTheme";

const { width } = Dimensions.get('window');

interface FormattedPoint {
  orden: string | number;
  descripcion: string;
}

interface DataViaje {
  msg: string;
  data: {
    viaje: {
      message: string;
      id: string;
    };
    puntos: number;
  };
}

interface req {
  data: obj[];
}

interface obj {
  id: string;
  marca: string;
  placa: string;
  capacidadmax: number;
  fotovehiculo: string;
  modelocar: string;
  color: string;
}

interface HistoryData {
  departureTime: Date;
  arrivalTime: Date;
  zoneInit: string;
  zoneEnd: string;
  price: number;
  seats: number;
  routePoints: FormattedPoint[];
  routePointsObj: FormattedPoint[];
}

export default function CreateRoutesDriver() {
  const { theme } = useTheme();
  const router = useRouter();
  const { info } = useLocalSearchParams();
  const [horaSalida, setHoraSalida] = useState<Date>();
  const [selectDate, setSelectedDate] = useState<Date>();
  const [horaLlegada, setHoraLlegada] = useState<Date>();
  const [zonaInicial, setZonaInicial] = useState<string>();
  const [zonaFinal, setZonaFinal] = useState<string>();
  const [precio, setPrecio] = useState<number>(0);
  const [asientos, setAsientos] = useState<number>(0);
  const [rutas, setRutas] = useState<FormattedPoint[]>();
  const { data, loading, error, post } = useApi<DataViaje>();
  const { data: data2, loading: loading2, error: error2, get } = useApi<req>();
  const [visible, setVisible] = useState<boolean>(false);
  const [idCar, setIdCar] = useState<string>();
  const [imgCar, setImgCar] = useState<string>();
  const [model, setModel] = useState<string>();
  const [placa, setPlaca] = useState<string>();
  const [controler, setControler] = useState<boolean>();
  const [refresh, setRefresh] = useState(true);
  const [wait, setWait] = useState<boolean>(false);
  
  const { storedValue: access_token } = useStorage('access_token');
  const { storedValue: userId } = useStorage('userId');

  const historyData: HistoryData = typeof info === "string"
    ? JSON.parse(decodeURIComponent(info))
    : ({} as HistoryData);

  useEffect(() => {
    if (historyData) {
      setHoraSalida(historyData.departureTime);
      setHoraLlegada(historyData.arrivalTime);
      setZonaInicial(historyData.zoneInit);
      setZonaFinal(historyData.zoneEnd);
      setPrecio(historyData.price);
      setAsientos(historyData.seats);
      setRutas(historyData.routePoints);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      get(`/api/vehiculo/listar/`, undefined, {
        headers: { Authorization: `Abduzcan ${access_token}` }
      });
    }
  }, [refresh]);

  useEffect(() => {
    const number: number = historyData ? 3 : 2;
    if (!error && data?.data) {
      router.push({ pathname: "/send", params: { steps: number } });
    }
  }, [data]);

  const dataCar = () => {
    setVisible(true);
    if (!data2) {
      get(`/api/vehiculo/listar/`, undefined, {
        headers: { Authorization: `Abduzcan ${access_token}` }
      });
    }
  };

  const send = async () => {
    if (wait) return;
    setWait(true);
    
    if (!zonaInicial || !zonaFinal || !precio || !asientos || !horaSalida || !horaLlegada || !rutas || !idCar || !selectDate) {
      Alert.alert(
        "Campos incompletos",
        "Por favor completa todos los campos para publicar tu ruta.",
        [{ text: "Entendido" }]
      );
      setWait(false);
      return;
    }
    console.log('Enviando datos del viaje...',zonaInicial, zonaFinal, precio, asientos, horaSalida, horaLlegada, rutas, idCar, selectDate);

    await post('/api/viajes/crear', {
      zonaInicial: zonaInicial,
      zonaFinal: zonaFinal,
      precio: precio,
      asientos: asientos,
      horaSalida: combinarFechaYHora(selectDate, new Date(horaSalida)),
      horaLlegada: combinarFechaYHora(selectDate, new Date(horaLlegada)),
      Listapuntos: rutas,
      id_vehiculo: idCar
    }, {
      headers: { Authorization: `Abduzcan ${access_token}` }
    });
    setWait(false);
  };

  const save = (idCar: string, img: string, model: string, placa: string) => {
    setImgCar(img);
    setModel(model);
    setPlaca(placa);
    setIdCar(idCar);
    setVisible(false);
  };

  const isFormComplete = zonaInicial && zonaFinal && precio && asientos && horaSalida && horaLlegada && rutas && idCar && selectDate;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Card */}
        <View style={[styles.card, { backgroundColor: theme.background2 }]}>
          
          {/* Date Picker Section */}
          <View style={[styles.section, {alignItems: 'center'}]}>
            <Text style={[styles.sectionLabel, { color: theme.text, textAlign: 'left', width: '100%' }]}>📅 Fecha del viaje</Text>
            <WeekPicker setSelectedDate={setSelectedDate} />
          </View>

          {/* Time Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: theme.text }]}>⏰ Horario</Text>
            <View style={styles.timeContainer}>
                <TimeInput
                  initialValue={horaSalida}
                  save={setHoraSalida}
                  backColor="#000000"
                  SalEnt="Salida"
                />
              <View style={styles.timeSeparator}>
                <View style={styles.arrowLine} />
                {/* <Text style={styles.arrowText}>→</Text> */}
              </View>
                <TimeInput
                  initialValue={horaLlegada}
                  save={setHoraLlegada}
                  backColor="#000000"
                  SalEnt="Llegada"
                />
            </View>
          </View>

          {/* Route Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: theme.text }]}>📍 Ruta</Text>
            <View style={styles.routeContainer}>
              <View style={styles.routeItem}>
                <View style={[styles.routeDot, styles.routeDotStart]} />
                <View style={styles.routeInputContainer}>
                  <Text style={[styles.routeLabel, { color: theme.text + '99' }]}>Origen</Text>
                  <Desplegable
                    initialValue={zonaInicial}
                    save={setZonaInicial}
                    backColor='#F6F6F6'
                  />
                </View>
              </View>
              
              <View style={styles.routeLine} />
              
              <View style={styles.routeItem}>
                <View style={[styles.routeDot, styles.routeDotEnd]} />
                <View style={styles.routeInputContainer}>
                  <Text style={[styles.routeLabel, { color: theme.text + '99' }]}>Destino</Text>
                  <Desplegable
                    initialValue={zonaFinal}
                    save={setZonaFinal}
                    backColor='#F6F6F6'
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Route Points Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: theme.text }]}>🗺️ Puntos de ruta</Text>
            <RoutePointsInput initialValue={historyData.routePointsObj} save={setRutas} />
          </View>

          {/* Price and Seats Section */}
          <View style={styles.section}>
            <View style={[styles.priceSeatsContainer, Platform.OS === 'web' ? { flexDirection: 'row', alignItems: 'center' } : {flexDirection: 'column'} ]}>
              <View style={styles.priceSeatsItem}>
                <PriceInput initialValue={precio} save={setPrecio} />
              </View>
              <View style={styles.priceSeatsItem}>
                <SeatsInput initialValue={asientos} save={setAsientos} />
              </View>
            </View>
          </View>

          {/* Vehicle Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: theme.text }]}>🚗 Vehículo</Text>
            <TouchableOpacity 
              style={[styles.vehicleCard, { backgroundColor: theme.background }]} 
              onPress={dataCar}
              activeOpacity={0.7}
            >
              {imgCar && model && placa ? (
                <View style={styles.vehicleSelected}>
                  <Image style={styles.vehicleImage} source={{ uri: imgCar }} />
                  <View style={styles.vehicleDetails}>
                    <Text style={[styles.vehicleModel, { color: theme.text }]}>{model}</Text>
                    <Text style={[styles.vehiclePlate, { color: theme.text + '99' }]}>{placa}</Text>
                  </View>
                  <Text style={styles.changeVehicle}>Cambiar</Text>
                </View>
              ) : (
                <View style={styles.vehicleEmpty}>
                  <View style={styles.vehicleEmptyIcon}>
                    <Text style={styles.vehicleEmptyIconText}>🚗</Text>
                  </View>
                  <Text style={[styles.vehicleEmptyText, { color: theme.text }]}>
                    Seleccionar vehículo
                  </Text>
                  <Text style={[styles.vehicleEmptySubtext, { color: theme.text + '66' }]}>
                    Toca para elegir
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Publish Button */}
          <TouchableOpacity
            style={[
              styles.publishButton,
              (!isFormComplete || wait) && styles.publishButtonDisabled
            ]}
            onPress={send}
            disabled={wait || !isFormComplete}
            activeOpacity={0.8}
          >
            <Text style={styles.publishButtonText}>
              {wait ? 'Publicando...' : 'Publicar ruta'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Vehicle Modal */}
      <Modal
        visible={visible}
        transparent
        animationType='slide'
        onRequestClose={() => { setVisible(false); setControler(false); }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecciona tu vehículo</Text>
              <TouchableOpacity 
                onPress={() => { setVisible(false); setControler(false); }}
                style={styles.modalClose}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent}>
              {loading2 ? (
                <View style={styles.modalLoading}>
                  <ActivityIndicator size="large" color="#000000" />
                  <Text style={styles.modalLoadingText}>Cargando vehículos...</Text>
                </View>
              ) : data2?.data[0] ? (
                data2.data?.map((obj, index) => (
                  <TouchableOpacity 
                    key={index} 
                    onPress={() => save(obj.id, obj.fotovehiculo, obj.modelocar, obj.placa)}
                    activeOpacity={0.7}
                  >
                    <CarCard
                      brand={obj.marca}
                      model={obj.modelocar}
                      color={obj.color}
                      capacity={obj.capacidadmax}
                      plate={obj.placa}
                      imageUrl={obj.fotovehiculo}
                    />
                  </TouchableOpacity>
                ))
              ) : controler ? (
                <AddCar setControler={setRefresh} refresh={setRefresh} />
              ) : (
                <View style={styles.noVehicles}>
                  <Text style={styles.noVehiclesIcon}>🚗</Text>
                  <Text style={styles.noVehiclesTitle}>No tienes vehículos</Text>
                  <Text style={styles.noVehiclesText}>
                    Registra tu primer vehículo para empezar a publicar rutas
                  </Text>
                  <TouchableOpacity 
                    style={styles.addVehicleButton} 
                    onPress={() => setControler(!controler)}
                  >
                    <Text style={styles.addVehicleButtonText}>+ Agregar vehículo</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <LoadingOverlay visible={loading || wait} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: '400',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  timeItem: {
    flex: 1,
  },
  timeSeparator: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    position: 'relative',
  },
  arrowLine: {
    position: 'absolute',
    width: 30,
    height: 2,
    backgroundColor: '#E0E0E0',
  },
  arrowText: {
    fontSize: 25,
    color: '#666',
  },
  routeContainer: {
    paddingLeft: 8,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  routeDotStart: {
    backgroundColor: '#000000',
  },
  routeDotEnd: {
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#000000',
    // backgroundColor: '#FFFFFF',
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: '#E0E0E0',
    marginLeft: 5,
    marginVertical: 8,
  },
  routeInputContainer: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  priceSeatsContainer: {
    gap: 16,
  },
  priceSeatsItem: {
    flex: 1,
  },
  vehicleCard: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    padding: 16,
    minHeight: 100,
  },
  vehicleSelected: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  vehicleDetails: {
    flex: 1,
    marginLeft: 16,
  },
  vehicleModel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  vehiclePlate: {
    fontSize: 14,
    fontWeight: '400',
  },
  changeVehicle: {
    color: '#b4e9bfff',
    fontSize: 14,
    fontWeight: '600',
  },
  vehicleEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  vehicleEmptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  vehicleEmptyIconText: {
    fontSize: 28,
  },
  vehicleEmptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  vehicleEmptySubtext: {
    fontSize: 13,
  },
  publishButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  publishButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontSize: 20,
    color: '#666',
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  modalLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  modalLoadingText: {
    marginTop: 16,
    fontSize: 15,
    color: '#666',
  },
  noVehicles: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  noVehiclesIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  noVehiclesTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  noVehiclesText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  addVehicleButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  addVehicleButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});