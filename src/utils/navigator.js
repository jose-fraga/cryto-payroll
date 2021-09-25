import { SCREENS } from "./constants";

/**
 * Get the Ionicons name depending on the route name
 */

export function getIconName({ routeName = SCREENS.EVENTS }) {
  switch (routeName) {
    case SCREENS.EVENTS:
      return 'event-note';
    case SCREENS.PROFILE:
      return 'person-outline';
    case SCREENS.PLAY:
      return 'play-circle-outline';
  }
}
