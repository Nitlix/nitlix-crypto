type NativeHashMethod = "SHA-256" | "SHA-384" | "SHA-512";

export default async function (
    input: string,
    method: NativeHashMethod = "SHA-256"
): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest(method, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
