import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { HasherInterface } from "./interfaces/hasher.interface";

export class HasherUtil implements HasherInterface {
  encrypt(text: string): string {
    return hashSync(text, genSaltSync(12));
  }

  compare(hash: string, compare_hash: string): boolean {
    return compareSync(hash, compare_hash);
  }
}
