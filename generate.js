var fs = require('fs');
var dust = require('dustjs-linkedin');

// Read pokemon data.
var pkm = {};
fs.readFileSync(__dirname + '/pokemon.txt', 'utf8')
  .split('\n')
  .forEach(function(p) {
    var s = p.split(',');
    pkm[s[0]] = { name: s[1], move: s[2] };
  });

var data = { rows: [] };
for (var i = -1; i < 10; i++) {
  var row = [];
  for (var j = 0; j < 10; j++) {
    var number = i === -1 ? '' + j : '' + i + j;
    var p = pkm[number];
    row.push({
      number: number,
      name: p.name,
      move: p.move,
      url: 'img/' + number + '.png',
    });
  }
  data.rows.push({ pokemon: row });
}

// Read and compile template.
var source = fs.readFileSync(__dirname + '/tmpl.html', 'utf8');
var fn = dust.compileFn(source);

fn(data, function(err, output) {
  if (err) throw err;
  fs.writeFileSync(__dirname + '/index.html', output);
});
