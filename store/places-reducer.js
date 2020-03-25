import { ADD_PLACE } from "./places-actions";
import Place from "../models/place";

const initialState = {
  places: []
};

export default (state = initialState, action) => {
  console.log("[places-reducer]...antes del caso con ", action.type);
  switch (action.type) {
    case ADD_PLACE:
      console.log(
        "[places-reducer]...ADD_PLACE case con title = ",
        action.placeData.title
      );
      const newPlace = new Place(
        new Date().toString(),
        action.placeData.title,
        action.placeData.image
      );
      return {
        places: state.places.concat(newPlace)
      };
    default:
      console.log("[places-reducer]...por defecto ");
      return state;
  }
};
