const mask = 0xffffffff;

export class SeededRandomGenerator {
  private m_w: number = 322411444;
  private m_z: number = 987654321;

  next(): number {
    this.m_z = (36969 * (this.m_z & 65535) + (this.m_z >> 16)) & mask;
    this.m_w = (18000 * (this.m_w & 65535) + (this.m_w >> 16)) & mask;
    let result = ((this.m_z << 16) + this.m_w) & mask;
    result /= 4294967296;
    return result + 0.5;
  }

  pick<T>(array: T[]): T {
    return array[Math.round((array.length - 1) * this.next())];
  }
}




