const { default:axios } = require("axios")
const isnumber = (s) => { return typeof parseInt(String(s).split(".").join("")) == 'number' ? true : false }
const tonumber = (str) => { return parseInt(String(str).split(".").join("")) }

module.exports = class {

#repo = ''
#key = 'version'
#filename = 'index.json'
#branch = 'master'
#current_version = ''

constructor(repo, currentVersion, config={key:this.#key, filename:this.#filename, branch:this.#branch}) {
if(typeof repo == 'object'){
repo = `${repo.owner}/${repo.repo}`
}
this.#repo = repo
if(config.key) this.#key = config.key
if(config.filename) this.#filename = config.filename
if(config.branch) this.#branch = config.branch
this.#current_version = currentVersion
if(!repo) throw new Error("repo is not defined")
}


 async check() {
  try{
   const req = await axios.get(`https://raw.githubusercontent.com/${this.#repo}/${this.#branch}/${this.#filename}`)
  const version = req.data[this.#key]
  if(!version) throw new Error("version is not defined")
  if(!isnumber(version)) throw new Error("version is not a number")
  if(tonumber(version) >= tonumber(this.#current_version)){
    return { ok: true, latest: version }
  }else{
    return { ok: false, latest: version, changelog: req.data.changelog, download: req.data.download }
  }
  }catch (err){
    return { ok: false, error: err }
  }
 } 
}

