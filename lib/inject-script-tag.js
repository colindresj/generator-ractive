module.exports = function (type) {
  var mark = '<!-- generator:ractive script -->',
      path = 'app/index.html',
      file = this.readFileAsString(path),
      tag = '<script src="scripts/' + type + 's/' + this.name + '.js"></script>';

  if (file.indexOf(tag) === -1) {
    this.write(path, file.replace(mark, tag + '\n\t\t'+ mark));
  }
};
