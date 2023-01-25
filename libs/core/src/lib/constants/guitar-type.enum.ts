export const AVAILABLE_GUITAR_TYPE = [
  'электро',
  'акустика',
  'укулеле',
] as const;

export type GuitarType = (typeof AVAILABLE_GUITAR_TYPE)[number];
