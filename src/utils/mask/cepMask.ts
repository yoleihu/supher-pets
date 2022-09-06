import { genericMask } from './genericMask';

export const formatCep = (rawCep: string) => genericMask(rawCep, '00000-000');