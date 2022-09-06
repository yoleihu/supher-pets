export const genericMask = (value: string, mask: string) => {
  let maskedValue = '';
  let i = 0;
  let forceBreak = false;

  for (const c of mask) {
    if (forceBreak) {
      break;
    }
    switch (c) {
      case '0':
        while (true) {
          const next = value[i];
          i++;
          if (!next) {
            break;
          }
          if (/[0-9]/.test(next)) {
            maskedValue += next;
            break;
          }
        }
        break;
      default:
        if (value[i] !== c && i >= value.length) {
          forceBreak = true;
        } else {
          if (value[i] === c) {
            i++;
          }
          maskedValue += c;
        }
        break;
    }
  }

  return maskedValue;
};