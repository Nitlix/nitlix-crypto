export default function (data: string, key: string): string {
    //get unicode integer values of each character in the data and key
    const dataVals: number[] = [];
    const keyVals: number[] = [];
    for (let i = 0; i < data.length; i++) {
        dataVals.push(data.charCodeAt(i));
    }

    for (let i = 0; i < key.length; i++) {
        keyVals.push(key.charCodeAt(i));
    }

    const variator =
        (keyVals.reduce((acc, val) => acc + val, 0) / keyVals.length) ** 3;

    //multiply each data value by the corresponding key value
    const encryptedVals: number[] = [];
    for (let i = 0; i < dataVals.length; i++) {
        encryptedVals.push(
            dataVals[i] * keyVals[i % keyVals.length] * variator
        );
    }

    //return the encrypted data as a string
    return encryptedVals.join(":");
}
