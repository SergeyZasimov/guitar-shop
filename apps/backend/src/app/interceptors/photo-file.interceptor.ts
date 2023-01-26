import { BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  PRODUCT_CONSTRAINT,
  PRODUCT_VALIDATION_MESSAGE,
  UPLOAD_FIELD_NAME,
} from '../product/product.constant';

const { PHOTO_TYPE } = PRODUCT_CONSTRAINT;
const { PHOTO_NOT_VALID } = PRODUCT_VALIDATION_MESSAGE;

export function PhotoFilterInterceptor() {
  return FileInterceptor(UPLOAD_FIELD_NAME, {
    fileFilter(_req, file, callback) {
      if (
        !file.mimetype.match(PHOTO_TYPE) ||
        !PHOTO_TYPE.test(file.originalname)
      ) {
        callback(new BadRequestException(PHOTO_NOT_VALID), false);
      } else {
        callback(null, true);
      }
    },
  });
}
