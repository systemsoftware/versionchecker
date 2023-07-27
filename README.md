# VersionChecker
### Keep your apps up-to-date!

## Installation
[`npm i @systemsoftware/versionchecker`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)

# Setup
## 1. Create a Repo on Github
[Create a Repo](https://github.com/new)
## 2. Create file
Create a file called `versions.json` in the root of your repo

## 3. Add versions
### For a single app

```json
{
    "version": "1.0.0",
    "download": "",
    "changelog": ""
}
```

### For multiple apps
If you want to have multiple apps in one file, add them like this:
 ```json
{
    "com.yourcompany.yourapp": {
     "version": "1.0.0",
     "download": "",
     "changelog": ""
 },
    "com.yourcompany.yourapp2": {
     "version": "1.2.0",
     "download": "",
     "changelog": ""
 }
 }
```

## 4. Set up your index.js file

```js
const VersionChecker = require('@systemsoftware/versionchecker');

const checker = new VersionChecker('repo-owner/repo-name', 'CURRENT VERSION HERE', {
    key:"version", // The key of the version in your json file. If you have multiple, set this to `com.yourcompany.yourapp`
    filename: 'versions.json', // The name of your json file
    branch: 'master', // The branch your json file is on
    // v_key: 'version' // Acts as "key" if "key" is an object, usually used for multiple apps
}); // The options are optional

(async () => {
console.log(await checker.check()); // { ok: true, latest: 'LATEST VERSION HERE' }
})();
```


### Default Option Values
> *Other arguments are required*
* key: 'version'
* filename: 'index.json'
* branch: 'master'
* v_key: 'version' (only for multiple apps)

## 5. Run your app

### Responses
#### Not Up-to-Date
```json
{
  "ok": false,
  "error": null,
  "changelog": "Example Changelog",
  "download": "http://example.com/download",
  "latest": "2.0.0"
}
```
#### Up-to-Date
```json
{
  "ok": true,
  "error": null,
  "changelog": null,
  "download": null,
  "latest": "2.0.0"
}
```
#### Error
```js
{
  "ok": false,
  "error":"error", // Will be a JS error
}
```

# Other info
 Get more in-depth help or suggest something on [Discord](https://discord.gg/nzTmfZ8) & [Github](https://github.com/systemsoftware/versionchecker/issues)

 Like our work? [Support us on Patreon](https://www.patreon.com/coolstone)
