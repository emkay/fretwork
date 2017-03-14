const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4')
const mkdirp = require('mkdirp')
const parallel = require('run-parallel')

class Fretwork {
  constructor (options) {
    this.options = options || {}
    this.path = this.options.path || '/tmp'
    this.depth = this.options.depth || 2
    this.preserveExt = this.options.preserveExt || false
    this.log = new Map()
  }

  add (filepath, cb) {
    const filemeta = path.parse(filepath)
    const hex = uuid().replace(/-/gi, '')
    const {basepath, filename} = this.getPath(hex)
    const fullpath = `${basepath}/${filename}`

    mkdirp(basepath, err => {
      if (err) return cb(err)
      else {
        this.write(filepath, fullpath)
        this.log.set(hex, {
          id: hex,
          path: fullpath,
          meta: filemeta
        })
        return cb(null, hex)
      }
    })
  }

  dir (dirPath, cb) {
    fs.readdir(dirPath, (err, files) => {
      if (err) return cb(err)

      const fns = files.map((file) => {
        const filepath = `./${dirPath}/${file}`
        return (fn) => {
          this.add(filepath, fn)
        }
      })

      parallel(fns, cb)
    })
  }

  getPath (filename) {
    const filepath = filename
      .split('', this.depth)
      .join('/')

    const name = filename.substring(this.depth)

    return {
      basepath: `${this.path}/${filepath}`,
      filename: name
    }
  }

  write (from, to) {
    const rs = fs.createReadStream(from)
    const ws = fs.createWriteStream(to)
    rs.pipe(ws)
  }
}

module.exports = Fretwork
