export const NAVIGATE = "NAVIGATE";
export const MENU_NAVIGATION = "MENU_NAVIGATION";
export const RESET_NAVIGATE = "RESET_NAVIGATE";

function setNavIndex(navigation) {
  return {
    type: MENU_NAVIGATION,
    navigation
  }
}

function setNavigation(navigation) {
  return {
    type: NAVIGATE,
    navigation
  }
}

function resetNavigation() {
  return {
    type: RESET_NAVIGATE
  }
}

export function menuNavigation(index, subIndex, route) {
  return (dispatch) => {
    const navigation = {
      index: parseInt(index),
      subIndex: parseInt(subIndex),
      route,
      navigate: true
    };
    dispatch(setNavIndex(navigation));
    dispatch(resetNavigation());
  }
}

export function navigate(route) {
  return dispatch => {
    const navigation = {
      route,
      navigate: true
    }
    dispatch(setNavigation(navigation));
    dispatch(resetNavigation());
  }
}
