import * as crypto from "node:crypto";

export default async function (
    string: string,
    saltedString: string,
    roundsUsed: number = 10
): Promise<boolean> {
    const [salt, hash] = saltedString.split(":");

    return new Promise((resolve, reject) => {
        crypto.pbkdf2(
            string,
            salt,
            roundsUsed,
            64,
            "sha512",
            (err, derivedKey) => {
                if (err) reject(err);
                resolve(hash === derivedKey.toString("hex"));
            }
        );
    });
}
