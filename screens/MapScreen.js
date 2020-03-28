import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import colors from "../constants/colors";

const MapScreen = props => {
  const initialLocation = props.navigation.getParam("initialLocation");
  const readOnly = props.navigation.getParam("readOnly");

  console.log("[MapScreen]...renderizando");
  console.log("[MapScreen]...initialLocation = ", initialLocation);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };
  const selectLocationHandler = event => {
    if (readOnly) {
      console.log("selectLocationHandler...readOnly");
      return;
    }
    console.log(
      "setSelectedLocation... lat = ",
      event.nativeEvent.coordinate.latitude
    );

    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    console.log("savePickedLocationHandler...firing");
    if (!selectedLocation) {
      console.log("!selectedLocation...firing");
      return;
    }
    props.navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker
          title="Ubicación escogido"
          coordinate={markerCoordinates}
        ></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = navData => {
  const readOnly = navData.navigation.getParam("readOnly");
  const saveFn = navData.navigation.getParam("saveLocation");
  if (readOnly) {
    return;
  }

  return {
    headerTitle: "Mapa",
    headerRight: () => (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Guardar</Text>
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : colors.primary
  }
});

export default MapScreen;
