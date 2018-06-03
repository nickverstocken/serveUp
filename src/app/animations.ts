import {animation, style, animate, trigger,  transition, useAnimation} from '@angular/animations';

export const fadeIn = animation([
  style({opacity: 0}),
  animate('500ms', style({opacity: 1}))
]);

export const fadeOut = animation([
  animate('500ms', style({opacity: 0}))
]);

/*
    zet de animate die je gedefinieerd hebt van ene state naar de andere
    void -> is nog niet present op de pagina
    * -> naar elke andere state
 */

export const fadeInOut = trigger('fadeInOut', [
  transition('void => *', useAnimation(fadeIn)),
  transition('* => void', useAnimation(fadeOut))
]);
