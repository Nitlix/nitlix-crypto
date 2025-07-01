export default async function (
    string: string,
    saltedString: string,
    roundsUsed: number = 10
): Promise<boolean> {
    const [salt, hash] = saltedString.split(":");

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

    // Derive bits using PBKDF2 with the same parameters
    const derivedBits = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: saltBuffer,
            iterations: roundsUsed,
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

    // Compare the derived hash with the stored hash
    return hash === derivedHex;
}
