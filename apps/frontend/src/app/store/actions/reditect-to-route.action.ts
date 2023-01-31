import { createAction } from '@reduxjs/toolkit';
import { ActionType, AppRoute } from '../../app.constant';

export const redirectToRoute = createAction<AppRoute>(
  ActionType.RedirectToRoute
);
