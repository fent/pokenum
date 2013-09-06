/*global dust, pokemon */
var tmpl =  '' +
  '<table>' +
  '  {#rows}' +
  '  <tr>' +
  '    {#pokemon}' +
  '    <td{#weeknum} class="weeknum-{.}"{/weeknum}>' +
  '      <div class="number">{number}</div>' +
  '      <div class="name">{name|s}</div>' +
  '      <img src="{url}" alt="{number}" />' +
  '      {#move}<div class="move">{.}</div>{/move}' +
  '    </td>' +
  '    {/pokemon}' +
  '  </tr>' +
  '  {/rows}' +
  '</table>';


// Organize data for template.
var data = { rows: [] };
for (var i = -1; i < 10; i++) {
  var row = [];
  for (var j = 0; j < 10; j++) {
    var number = i === -1 ? '' + j : '' + i + j;
    var p = pokemon[number];
    row.push({
      number: number,
      name: p.name,
      move: p.move,
      weeknum: p.weeknum,
      url: 'img/' + number + '.png',
    });
  }
  data.rows.push({ pokemon: row });
}

// Compile template.
var compiled = dust.compileFn(tmpl, 'body');
dust.loadSource(compiled);

// Render template.
dust.render('body', data, function(err, output) {
  if (err) throw err;
  $(function() {
    $('body').html(output);
    for (var i = 0; i < 7; i++) {
      var s = $('.weeknum-' + i);
      selectionHover(s);
    }
  });
});


function selectionHover(s) {
  s.hover(function() {
    s.addClass('hi');
  }, function() {
    s.removeClass('hi');
  });
}
