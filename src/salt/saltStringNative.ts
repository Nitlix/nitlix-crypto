export default async function (
    string: string,
    rounds: number = 10
): Promise<string> {
    // Generate a random salt (16 bytes = 32 hex characters)
    const saltArray = new Uint8Array(16);
    crypto.getRandomValues(saltArray);
    const salt = Array.from(saltArray, (byte) =>
        byte.toString(16).padStart(2, "0")
    ).join("");

    // Convert string to ArrayBuffer
    const encoder = new TextEncoder();
    const stringBuffer = encoder.encode(string);
    const saltBuffer = encoder.encode(salt);

    // Import the key for PBKDF2
    const key = await crypto.subtle.importKey(
        "raw",
        stringBuffer,
        { name: "PBKDF2" },
        false,
        ["deriveBits"]
    );

    // Derive bits using PBKDF2
    const derivedBits = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: saltBuffer,
            iterations: rounds,
            hash: "SHA-512",
        },
        key,
        512 // 64 bytes = 512 bits
    );

    // Convert derived bits to hex string
    const derivedArray = new Uint8Array(derivedBits);
    const derivedHex = Array.from(derivedArray, (byte) =>
        byte.toString(16).padStart(2, "0")
    ).join("");

    return salt + ":" + derivedHex;
}
