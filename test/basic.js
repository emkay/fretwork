const fs = require('fs')
const test = require('tap').test
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const Fretwork = require('..')

function setup (cb) {
  mkdirp('./_temp_/data', err => {
    if (err) throw err
    mkdirp('./_temp_/files', err => {
      if (err) throw err
      const ws = fs.createWriteStream(`./_temp_/files/1.txt`)
      ws.end('hello')
      cb()
    })
  })
}

function teardown (cb) {
  rimraf('_temp_', err => {
    if (err) throw err
    cb()
  })
}

test('basic add', t => {
  t.plan(3)
  setup(() => {
    t.pass('setup')
    const fw = new Fretwork({path: './_temp_/data', depth: 2})
    fw.add('./_temp_/files/1.txt', (err, hex) => {
      if (err) throw err

      const filedata = fw.log.get(hex)
      fs.stat(filedata.path, (err, stats) => {
        if (!err) t.pass('the file is in the correct place')
        teardown(t.pass)
      })
    })
  })
})

test('dir add', t => {
  t.plan(3)
  setup(() => {
    t.pass('setup')
    const fw = new Fretwork({path: './_temp_/data', depth: 2})
    fw.dir('./_temp_/files', (err, results) => {
      if (err) throw err
      t.ok(results)
      teardown(t.pass)
    })
  })
})
