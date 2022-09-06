import { genericMask } from './genericMask';

export const formatCnpj = (rawCpf: string) => genericMask(rawCpf, '00.000.000/0000-00');