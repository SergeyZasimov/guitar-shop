import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { ActionType } from '../../app.constant';
import { browserHistory } from '../../services/browser-history.service';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirectMiddleware: Middleware<unknown, Reducer> =
  (_store) => (next) => (action: PayloadAction<string>) => {
    if (action.type === ActionType.RedirectBack) {
      browserHistory.back();
    }
    return next(action);
  };
