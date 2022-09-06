import { genericMask } from './genericMask';

export const formatCpf = (rawCpf: string) => genericMask(rawCpf, '000.000.000-00');