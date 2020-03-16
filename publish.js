/**
 * Publishing on Che IDE Processes:
 * NOTE: Make sure your player and sf-core versions are correct ! **
 * - Go to cloud.smartface.io and login with correct team
 * - Go to https://cloud.smartface.io/api/ide/token and copy your token value to token variable
 * - One time configurations - assuming no profile or certificate change
 *   - On C9 IDE, Open a workspace and add ?logToConsole=1 to the end of URL
 *   - Copy project.json on CHE IDE and paste it to C9 IDE project.json
 *   - On C9 IDE, click Publish and start publish process and open developer console
 *   - Replace contents of output/.license.xml with your workspace
 *   - When publish starts, replace following values on rawArgs as documented
 */
const { spawn } = require('child_process');
let yourToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1mQzNsWS1kbzhBQTVtVFl0cmdPQTN0YU9RTSIsImtpZCI6Ii1mQzNsWS1kbzhBQTVtVFl0cmdPQTN0YU9RTSJ9.eyJjbGllbnRfaWQiOiJzbWFydGZhY2VfcG9ydGFsX2NsaWVudF9pZCIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsInBob25lIiwicmVhbF9lbWFpbCIsInJvbGVzIiwicGVybWlzc2lvbiIsImFkZHJlc3MiLCJvd25lciIsImxpY2Vuc2UiLCJwb3J0YWxfYXBpIiwiaWRlbnRpdHlfYXBpIiwiZW50ZXJwcmlzZV9hcGkiLCJ3bXNfYXBpIiwiY2xvdWRfaWRlIiwic3NoIl0sInN1YiI6Ijg2NjUxZmVlLTAyMzAtNDAyZS1hNjYzLTFhNzkyZDY0YTY5OSIsImFtciI6WyJwYXNzd29yZCJdLCJhdXRoX3RpbWUiOjE1ODEwNTg2NDcsImlkcCI6Imlkc3J2IiwiaXNzIjoiaHR0cHM6Ly9pZC5zbWFydGZhY2UuaW8vaWRlbnRpdHkiLCJhdWQiOiJodHRwczovL2lkLnNtYXJ0ZmFjZS5pby9pZGVudGl0eS9yZXNvdXJjZXMiLCJleHAiOjE1ODExMzA2NDgsIm5iZiI6MTU4MTA1ODY0OH0.dvQC7GrPGwg8I7crBkud0hcPds-S4Ll8ygiTQB2msB_eE_sFyT2_babqBPOj0jv-P6W8uH0E8THYqyzafM_VK2LMYKSmVKaCNnfmIbtU_XnAhp5vL5l5QMD2MkZZfJwsGEEtb_YfddVs9ryUnFQ9RlKJ7duOJwM89s6fQxHqpXuIsAzxSGJSTDtbTxtIKZH6pZ0Oadx4F2019LJm-isnQM77Yakiupyy9GFk2dzWm9DqIJeCNLosmjZKRbUPyw81MJ2KT_bFbCB_zmjxRVIvA6YcMBmh2Q3ybkZ8B1GSj-FB-XY-uDaQaY0puBfDPlTwpAoaTUStQdUZNvVF9N5JDQ";
let rawArgs = [
    "--projectRoot", "/projects/workspace", 
    "--task", "test:Android", //Change if you want only one OS publish
    "--logStdOut", "json", 
    "--logLevel", "error", 
    "--logFile", "output/publish-error.log", 
    "--maxJavaMemory", "400m", 
    "--androidCloudBuild", true, 
    "--token", `Bearer ${yourToken}`,
    "--clisecret", "5daf66c5-7029-6fb1-e795-2b7a99428951", //Replace with your value
    "--iosTPID", "", //Replace with your value. Use empty string for creating new profile
    "--androidTPID", "5776", //Replace with your value. Use empty string for creating new profile
    "--provisioningProfileID", "817", //Replace with your value
    "--keystoreID", "" //Replace if needed
];
const smfc = spawn("/usr/local/bin/smfc", rawArgs); //Use /usr/local/bin/smfc if raises error
smfc.stdout.on('data', (data) => {
    if(!Array.isArray(data)) {
        let array = new Uint8Array(data);
        let str = String.fromCharCode.apply(String, array);
        console.info(str);
    }
    else {
        console.info(data);
    }
});
smfc.stderr.on('data', (data) => {
    if(Array.isArray(data)) {
        let array = new Uint8Array(data);
        let str = String.fromCharCode.apply(String, array);
        console.error(str);
    }
    else {
        console.error(data);
    }
});
smfc.on('close', (code) => console.log(`smfc exited with code ${code}`));