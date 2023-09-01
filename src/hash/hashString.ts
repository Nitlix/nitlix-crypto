import { HashMethods } from "./hashTypes";
import crypto from "crypto";

export default function(string: string, method: HashMethods="sha256"): string {
    let hash = crypto.createHash(method)
    hash.update(string);
    return hash.digest("hex");
}