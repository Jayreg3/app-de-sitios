import * as FileSystem from "expo-file-system";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
import { insertPlace, fetchPlaces } from "../helpers/db";
import Env from "../env";

export const addPlace = (title, image, location) => {
  console.log("[places-actions]...addPlace firing");
  return async dispatch => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${Env.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error("Algo salió mal");
    }

    const resData = await response.json();
    console.log("[places-actions]...resData= ", resData);
    let address;
    if (resData.results.length === 0) {
      address = "Dirección por defecto";
    } else {
      address = resData.results[0].formatted_address;
    }
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      console.log("[places-actions]...addPlace try block");
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: { lat: location.lat, lng: location.lng }
        }
      });
    } catch (err) {
      console.log("[places-actions]...addPlace catch err");
      throw err;
    }
  };
};

export const loadPlaces = () => {
  console.log("[places-actions]...loadPlaces firing");
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();
      console.log(dbResult);
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
