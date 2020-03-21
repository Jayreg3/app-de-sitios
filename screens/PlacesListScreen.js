import React from "react";
import { Platform } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";

const PlacesListScreen = props => {
  return <Text>Pantalla de la lista de los sitios</Text>;
};

const styles = StyleSheet.create({});

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: "Lista de sitios",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    )
  };
};

export default PlacesListScreen;
