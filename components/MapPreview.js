import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
// import colors from "../constants/colors";
import Env from "../env";

const MapPreview = props => {
  let imagePreviewUrl =
    "https://f.rpp-noticias.io/2019/12/16/876520sv-timelapsegif.gif";
  if (props.location) {
    //cuando tengo un API key que es valido
    //imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lat}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${props.location.lat},${props.location.lng}&key=${Env.googleApiKey}`;
  }
  console.log("[MapPreview]...props.location = ", props.location);
  console.log("[MapPreview]...imagePreviewUrl = ", imagePreviewUrl);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <Image
          style={styles.mapImage}
          source={{
            uri: imagePreviewUrl
          }}
        />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center"
  },
  mapImage: {
    width: "100%",
    height: "100%"
  }
});

export default MapPreview;
