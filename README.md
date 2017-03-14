# fretwork

[![Greenkeeper badge](https://badges.greenkeeper.io/emkay/fretwork.svg)](https://greenkeeper.io/)
evenly distributed files

## Install

`npm i fretwork`

## Use

```javascript
const Fretwork = require('fretwork')
const fw = new Fretwork({dir: '/data', depth: 4})
fw.add('path/to/some/file.txt', (err, id) => {

})
```


