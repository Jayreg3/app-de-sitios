import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  TextInput
} from "react-native";
import { useDispatch } from "react-redux";
import colors from "../constants/colors";
import * as placesActions from "../store/places-actions";
import ImagePicker from "../components/ImagePicker";

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const dispatch = useDispatch();

  const titleChangeHandler = event => {
    console.log("titleChangeHandler...text =", event.nativeEvent.text);
    setTitleValue(event.nativeEvent.text);
  };

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
    console.log("imageTakenHandler... image =", imagePath);
  };

  const savePlaceHandler = () => {
    console.log("savePlaceHandler...image state = ", selectedImage);
    dispatch(placesActions.addPlace(titleValue, selectedImage));
    console.log("[NewPlaceScreen]...savePlaceHandler firing");
    console.log("[NewPlaceScreen]...titleValue = ", titleValue);
    props.navigation.goBack();
  };

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
      <ImagePicker onImageTaken={imageTakenHandler} />
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
