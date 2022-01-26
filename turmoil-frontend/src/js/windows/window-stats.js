import { Ajax } from '../core/turmoil-ajax';

export const WindowStats = {
  updateStats(callBackFunction) {
    Ajax.exec({
      url: 'character/state',
      onSuccess: callBackFunction,
    });
  },
};
