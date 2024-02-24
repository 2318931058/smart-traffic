import { v4 } from 'uuid'
export const createId = () => {
      const id = BigInt(`0x${v4().replace(/-/g, '')}`).toString().slice(0, 8);
      return Number(id);
}