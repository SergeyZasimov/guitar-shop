import { ClassConstructor, plainToInstance } from 'class-transformer';

export function fillObject<T, V>(
  rdo: ClassConstructor<T>,
  plainObject: V,
  group?: string | undefined
): T {
  return plainToInstance(rdo, plainObject, {
    excludeExtraneousValues: true,
    groups: group ? [group] : undefined,
  });
}
