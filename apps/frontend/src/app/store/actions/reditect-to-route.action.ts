import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../app.constant';

export const redirectBack = createAction<void>(ActionType.RedirectBack);
