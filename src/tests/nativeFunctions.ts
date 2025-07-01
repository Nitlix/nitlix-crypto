import saltStringNative from "../salt/saltStringNative";
import saltCompareNative from "../salt/saltCompareNative";
import saltString from "../salt/saltString";
import saltCompare from "../salt/saltCompare";

async function main() {
    const testString = "string";
    console.log("Original string:", testString);

    // Test Native Functions
    console.log("\n=== Native Functions ===");

    // Salt the string with timing (Native)
    const nativeSaltStartTime = performance.now();
    const nativeSaltedString = await saltStringNative(testString);
    const nativeSaltEndTime = performance.now();
    const nativeSaltDuration = nativeSaltEndTime - nativeSaltStartTime;
    console.log("Native salted string:", nativeSaltedString);
    console.log(`Native salting took ${nativeSaltDuration.toFixed(2)}ms`);

    // Compare the original string with the salted string with timing (Native)
    const nativeCompareStartTime = performance.now();
    const nativeIsMatch = await saltCompareNative(
        testString,
        nativeSaltedString
    );
    const nativeCompareEndTime = performance.now();
    const nativeCompareDuration = nativeCompareEndTime - nativeCompareStartTime;
    console.log("Native comparison result:", nativeIsMatch);
    console.log(`Native comparison took ${nativeCompareDuration.toFixed(2)}ms`);

    // Test with wrong string with timing (Native)
    const wrongString = "wrong";
    const nativeWrongStartTime = performance.now();
    const nativeWrongMatch = await saltCompareNative(
        wrongString,
        nativeSaltedString
    );
    const nativeWrongEndTime = performance.now();
    const nativeWrongDuration = nativeWrongEndTime - nativeWrongStartTime;
    console.log("Native wrong string comparison:", nativeWrongMatch);
    console.log(
        `Native wrong string comparison took ${nativeWrongDuration.toFixed(
            2
        )}ms`
    );

    // Test Crypto Module Functions
    console.log("\n=== Crypto Module Functions ===");

    // Salt the string with timing (Crypto)
    const cryptoSaltStartTime = performance.now();
    const cryptoSaltedString = await saltString(testString);
    const cryptoSaltEndTime = performance.now();
    const cryptoSaltDuration = cryptoSaltEndTime - cryptoSaltStartTime;
    console.log("Crypto salted string:", cryptoSaltedString);
    console.log(`Crypto salting took ${cryptoSaltDuration.toFixed(2)}ms`);

    // Compare the original string with the salted string with timing (Crypto)
    const cryptoCompareStartTime = performance.now();
    const cryptoIsMatch = await saltCompare(testString, cryptoSaltedString);
    const cryptoCompareEndTime = performance.now();
    const cryptoCompareDuration = cryptoCompareEndTime - cryptoCompareStartTime;
    console.log("Crypto comparison result:", cryptoIsMatch);
    console.log(`Crypto comparison took ${cryptoCompareDuration.toFixed(2)}ms`);

    // Test with wrong string with timing (Crypto)
    const cryptoWrongStartTime = performance.now();
    const cryptoWrongMatch = await saltCompare(wrongString, cryptoSaltedString);
    const cryptoWrongEndTime = performance.now();
    const cryptoWrongDuration = cryptoWrongEndTime - cryptoWrongStartTime;
    console.log("Crypto wrong string comparison:", cryptoWrongMatch);
    console.log(
        `Crypto wrong string comparison took ${cryptoWrongDuration.toFixed(
            2
        )}ms`
    );

    // Performance Comparison Summary
    console.log("\n=== Performance Comparison ===");
    console.log(
        `Salting - Native: ${nativeSaltDuration.toFixed(
            2
        )}ms, Crypto: ${cryptoSaltDuration.toFixed(2)}ms`
    );
    console.log(
        `Comparison - Native: ${nativeCompareDuration.toFixed(
            2
        )}ms, Crypto: ${cryptoCompareDuration.toFixed(2)}ms`
    );
    console.log(
        `Wrong String - Native: ${nativeWrongDuration.toFixed(
            2
        )}ms, Crypto: ${cryptoWrongDuration.toFixed(2)}ms`
    );
}

// Run the main function
main().catch(console.error);
