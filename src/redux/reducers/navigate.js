import { NAVIGATE, MENU_NAVIGATION, RESET_NAVIGATE } from "../actions/navigate";

export default function navigation(
  state = { index: 0, subIndex: -1, route: "", navigate: false },
  action
) {
  switch (action.type) {
    case MENU_NAVIGATION:
      return action.navigation;

    case NAVIGATE:
      return {
        ...state,
        route: action.navigation.route,
        navigate: action.navigation.navigate
      };

    case RESET_NAVIGATE:
      return { ...state, navigate: false };

    default:
      return state;
  }
}
