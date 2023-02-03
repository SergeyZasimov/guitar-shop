import {
  ApiQuery,
  GuitarType,
  QueryField,
  StringsNumber,
} from '@guitar-shop/core';
import { ModalClass } from '../app.constant';

export type FilterProperty = keyof Pick<
  ApiQuery,
  QueryField.GuitarTypeFilter | QueryField.StringsNumberFilter
>;

export type FilterPropertyValue = StringsNumber | GuitarType;

export interface ModalProps {
  isOpen: boolean;
  onClickCloseModal: () => void;
  modalClassName?: ModalClass;
}
