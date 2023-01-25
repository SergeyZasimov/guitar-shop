export const AVAILABLE_STRINGS_NUMBERS = ['4', '6', '7', '12'] as const;

export type StringsNumber = (typeof AVAILABLE_STRINGS_NUMBERS)[number];
