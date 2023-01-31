export const GUITAR_COLLECTION = {
  acoustic: 'Акустические гитары',
  electric: 'Электрогитары',
  ukulele: 'Укулеле',
} as const;

export type GuitarType = keyof typeof GUITAR_COLLECTION;

export const AVAILABLE_GUITAR_TYPE = Object.keys(GUITAR_COLLECTION) as [
  GuitarType
];
