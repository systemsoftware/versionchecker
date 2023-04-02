# VersionChecker
### Keep your apps up-to-date!

## Installation
[`npm i versionchecker`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)

## Setup
1. Create a Repo on Github

2. Create a file called `versions.json` in the root of your repo

3. Add the following to your `versions.json` file:

```json
{
    "version": "1.0.0",
    "download": "",
    "changelog": ""
}
```

4. Set-up your `index.js` file

```js
const VersionChecker = require('@systemsoftware/versionchecker');

const checker = new VersionChecker({ owner:"REPO_OWNER_NAME", repo:'REPO_NAME' }, 'CURRENT VERSION HERE', {
    key: 'version', // The key in your json file that contains the version
    filename: 'index.json', // The name of your json file
    branch: 'master', // The branch your json file is on
}); // The options are optional

(async () => {
console.log(await checker.check()); // { ok: true, latest: 'LATEST VERSION HERE' }
})();
```

5. Run your file with `node index.js` and you should get the latest version of your app!

## Other info
 Get more in-depth help or suggest something on [Discord](https://discord.gg/nzTmfZ8) & [Github](https://github.com/coolstone-tech/versionchecker/issues)

 Like our work? [Support us on Patreon](https://www.patreon.com/coolstone)