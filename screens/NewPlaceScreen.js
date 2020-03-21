import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  TextInput
} from "react-native";
import colors from "../constants/colors";

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState("");

  const titleChangeHandler = text => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {};

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.textInput}
          value={titleValue}
          onChange={titleChangeHandler}
        />
      </View>
      <Button
        title="Guardar sitio"
        color={colors.primary}
        onPress={savePlaceHandler}
      />
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Agregar nuevo sitio"
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;
