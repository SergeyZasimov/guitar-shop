import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { Action } from 'history';
import { ActionType } from '../../app.constant';
import { browserHistory } from '../../services/browser-history.service';
import { AppRoute } from '../../utils';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirectMiddleware: Middleware<unknown, Reducer> =
  (_store) => (next) => (action: PayloadAction<string>) => {
    if (action.type === ActionType.RedirectBack) {
      const lastAction = browserHistory.action;
      if (lastAction === Action.Pop) {
        browserHistory.push(AppRoute.Root);
      } else {
        browserHistory.back();
      }
    }

    if (action.type === ActionType.RedirectToRoute) {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
