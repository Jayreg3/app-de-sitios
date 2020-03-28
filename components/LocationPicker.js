import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import colors from "../constants/colors";
import MapPreview from "./MapPreview";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = props.navigation.getParam("pickedLocation");

  const { onLocationPicked } = props;

  useEffect(() => {
    setPickedLocation(mapPickedLocation);
    onLocationPicked(mapPickedLocation);
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert("Permisos insuficientes", "Hay que conceder permiso");
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.cords.longitude
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.cords.longitude
      });
    } catch (err) {
      Alert.alert(
        "No se ha podido encontrar tu ubicación",
        "Por favor, reintentalo luego o escoger un sitio desde la mapa"
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator />
        ) : (
          <Text>Ya no se ha elegido una imagen.</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Recoger ubicación"
          color={colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Escoger por la mapa"
          color={colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
});

export default LocationPicker;
