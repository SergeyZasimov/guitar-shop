import { ClassConstructor, plainToInstance } from 'class-transformer';

export function fillObject<T, V>(rdo: ClassConstructor<T>, plainObject: V): T {
  return plainToInstance(rdo, plainObject, { excludeExtraneousValues: true });
}
