import * as crypto from "node:crypto";

export default function (string: string, rounds: number = 10): Promise<string> {
    return new Promise((resolve, reject) => {
        // generate a random salt for the hashing function
        const salt = crypto.randomBytes(16).toString("hex");

        crypto.pbkdf2(string, salt, rounds, 64, "sha512", (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString("hex"));
        });
    });
}
