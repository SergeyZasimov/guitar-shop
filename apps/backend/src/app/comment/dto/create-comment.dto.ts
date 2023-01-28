import { CommentField, NewComment } from '@guitar-shop/core';
import { IsMongoId, IsNotEmpty, Length, Max, Min } from 'class-validator';
import {
  COMMENT_CONSTRAINT,
  COMMENT_VALIDATION_MESSAGE,
} from '../comment.constant';

const { RATING, TEXT, ADVANTAGES, DISADVANTAGES } = COMMENT_CONSTRAINT;
const {
  ADVANTAGES_LENGTH_NOT_VALID,
  DISADVANTAGES_LENGTH_NOT_VALID,
  RATING_NOT_VALID,
  TEXT_LENGTH_NOT_VALID,
} = COMMENT_VALIDATION_MESSAGE;

export class CreateCommentDto implements NewComment {
  @IsMongoId()
  @IsNotEmpty()
  [CommentField.Author]: string;

  @Length(ADVANTAGES.MIN, ADVANTAGES.MAX, {
    message: ADVANTAGES_LENGTH_NOT_VALID,
  })
  @IsNotEmpty()
  [CommentField.Advantages]: string;

  @Length(DISADVANTAGES.MIN, DISADVANTAGES.MAX, {
    message: DISADVANTAGES_LENGTH_NOT_VALID,
  })
  @IsNotEmpty()
  [CommentField.Disadvantages]: string;

  @Length(TEXT.MIN, TEXT.MAX, { message: TEXT_LENGTH_NOT_VALID })
  @IsNotEmpty()
  [CommentField.Text]: string;

  @Max(RATING.MAX, { message: RATING_NOT_VALID })
  @Min(RATING.MIN, { message: RATING_NOT_VALID })
  @IsNotEmpty()
  [CommentField.Rating]: number;
}
