import crypto from "node:crypto";

export type HashMethods =
    | "sha256"
    | "sha512"
    | "md5"
    | "sha1"
    | "sha224"
    | "sha384"
    | "ripemd160";

export default function (
    string: string,
    method: HashMethods = "sha256"
): string {
    let hash = crypto.createHash(method);
    hash.update(string);
    return hash.digest("hex");
}
