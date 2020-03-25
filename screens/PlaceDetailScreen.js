import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlaceDetailScreen = props => {
  return <Text>Pantalla de los detalles de los sitios</Text>;
};

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle")
  };
};

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
