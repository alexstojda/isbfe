function generate(): number {
  const seed = new Date().getTime().toString();

  let x = 0;
  let y = 0;
  let z = 0;
  let w = 0;

  function next() {
    const t = x ^ (x << 11);
    x = y;
    y = z;
    z = w;
    w ^= ((w >>> 19) ^ t ^ (t >>> 8)) >>> 0;
    return w / 0x100000000;
  }

  for (var k = 0; k < seed.length + 64; k++) {
    x ^= seed.charCodeAt(k) | 0;
    next();
  }

  return next();
}

export function rand() {
  while (true) {
    const ban = Math.floor(generate() * 1000000000);
    if (isValid(ban)) {
      return ban;
    }
  }
}

export function isValid(ban?: number): boolean {
  return ban !== undefined && ban > 200000000 && ban < 599999999;
}
