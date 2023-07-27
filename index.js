const { default:axios } = require("axios")
const semver = require("semver")

module.exports = class {

#repo = ''
#key = 'version'
#filename = 'index.json'
#branch = 'master'
#current_version = ''
#v_key = 'version'

constructor(repo, currentVersion, config={key:this.#key, filename:this.#filename, branch:this.#branch, v_key:this.#v_key}) {
if(typeof repo == 'object'){
repo = `${repo.owner}/${repo.repo}`
}
if(!repo) throw new Error("repo is not defined")
this.#repo = repo
if(config.key) this.#key = config.key
if(config.filename) this.#filename = config.filename.endsWith('.json') ? config.filename : `${config.filename}.json`
if(config.branch) this.#branch = config.branch
if(config.v_key) this.#v_key = config.v_key
this.#current_version = currentVersion
}


 async check() {
  try{
  const req = await axios.get(`https://raw.githubusercontent.com/${this.#repo}/${this.#branch}/${this.#filename}`)
  let version = ''
  if(typeof req.data[this.#key] == 'string') version = req.data[this.#key]
  if(typeof req.data[this.#key] == 'object') version = req.data[this.#key][this.#v_key]
  if(!version) throw new Error("Could not find version")
  if(semver.valid(version) == null) throw new Error(`version.${this.#key} is not a valid semver`)
  if(semver.valid(this.#current_version) == null) throw new Error(`Current version is not a valid semver`)
  if(!version) throw new Error(`version.${this.#key} is not defined`)
  const ok = semver.lte(version, this.#current_version)
  const data = { ok, error: null, changelog: null, download: null }
  data.latest = version
  if(!ok){
    data.changelog = typeof req.data[this.#key] == 'object' ? req.data[this.#key].changelog : req.data.changelog
    data.download = typeof req.data[this.#key] == 'object' ? req.data[this.#key].download : req.data.download
  }
  return data
  }catch (error){
    return { ok: false, error }
  }
 } 
}
