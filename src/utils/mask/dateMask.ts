import { genericMask } from './genericMask';

export const formatDate = (rawDate: string) => genericMask(rawDate, '00/00/0000');