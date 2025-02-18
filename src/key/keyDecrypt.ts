export default function (data: string, key: string): string {
    //get unicode integer values of each character in the data and key
    const dataVals: number[] = data.split(":").map((val) => parseInt(val));
    const keyVals: number[] = [];
    for (let i = 0; i < key.length; i++) {
        keyVals.push(key.charCodeAt(i));
    }

    const variator =
        (keyVals.reduce((acc, val) => acc + val, 0) / keyVals.length) ** 3;

    //divide each data value by the corresponding key value
    const decryptedVals: number[] = [];
    for (let i = 0; i < dataVals.length; i++) {
        decryptedVals.push(
            Math.round(dataVals[i] / (keyVals[i % keyVals.length] * variator))
        );
    }

    //return the decrypted data as a string
    return decryptedVals.map((val) => String.fromCharCode(val)).join("");
}
