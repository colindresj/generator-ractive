module.exports = function (type) {
  var mark = '<!-- generator:ractive script -->',
      path = 'app/index.html',
      file = readFile.call(this, path),
      tag = '<script src="scripts/' + type + 's/' + this.name + '.js"></script>';

  if (file && file.indexOf(tag) === -1) {
    this.write(path, file.replace(mark, tag + '\n\t\t'+ mark));
  }

  function readFile (path) {
    try {
      return this.readFileAsString(path);
    } catch (err) {
      return undefined;
    }
  }
};
