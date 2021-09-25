import { SCREENS } from "./constants";

/**
 * Get the Ionicons name depending on the route name
 */

export function getIconName({ routeName = SCREENS.PRICES }) {
  switch (routeName) {
    case SCREENS.PRICES:
      return 'bar-chart';
    case SCREENS.PROFILE:
      return 'person-outline';
    case SCREENS.CONTRACTOR:
      return 'attach-money';
  }
}
