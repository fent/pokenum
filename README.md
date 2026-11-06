# pokenum

A way to remember numbers using Pokémon.

If you're a fan of Pokémon and would like to use them to remember numbers, consider using this method.

### Usage

Take any sequence of a number, such as a common phone number: `(253) 200-4433`. Break it up into pairs `25` `32` `00` `44` `33`. Each pair will be representing a pokemon or a move, alternating between the two. The sequence will be memorized by having a pair interact with the next.

In this case, the first `25` which is pikachu, will be our first pokemon. If this phone number belongs to someone, it's easier to imagine this scene happening in a place in which you usually interact with this person, or where you've met them. The next pair will represent a move that the previous pokemon will perform. `32`, so pikachu will be using double kick on the next pokemon, represented by the next pair. And finally that pokemon will use the next pair as its move, which will target the next pokemon.

Alternating between a pokemon and a pokemon moves helps lower the amount of creativity required. Thus memorizing and recalling a sequence will take less time. The final scene will be pikachu using double kick on missingno, missingno using protect on nidorino.

Use your imagination for how double kick and protect will look. I like the idea of pikachu hitting its target with both of its feet and then using it as support for a backflip. For attacks like protect which do not make contact with the target, try to imagine a way in which it does interact with the target. In this case I will imagine missingno walking into nidorino as the protect "disc" spins around it.

### Who should use this?

Consider learning this if you care enough about being able to remember a sequence of numbers. At first, it will take longer to remember and to recall. The indices include getting a number from a pokemon/move and vice versa. Remembering a pokemon from a move is not necessary, it's mainly used to help associate the two with the number.

If you're not a pokemon fan or don't want to use them for this, you can use whatever else. I got this idea from the book [How to Develop a Perfect Memory](http://amzn.to/16HWbVE) by Dominic O'Brien. He suggested converting the numbers into letters and associating those letters with whatever comes to mind first. I found it more fun to make a list of pokemon and use that instead.

### Development

The page is a pre-rendered static site. There is no runtime JavaScript and no dependencies; `index.html` is generated from `template.html` and `pokemon.json` by `build.js`.

```sh
npm run build   # validate the data and regenerate index.html
npm start       # serve the page at http://localhost:8000
```

`index.html` is fully pre-rendered, so you can also open it directly in a browser without a server. It is generated from `template.html` and `pokemon.json`, so edit those and then run `npm run build`. Commit both the source and the generated `index.html`.

| File | Purpose |
| --- | --- |
| `pokemon.json` | The 110 entries, keyed by `0`–`9` and `00`–`99`. Each has a `name`, an optional `move`, and a `week` from `0` to `6` (shown as Group 1–7 in the legend). |
| `template.html` | The HTML skeleton, with a `<!-- CARDS -->` placeholder. |
| `build.js` | Validates entries, weeks, moves, and images, then writes `index.html`. |
| `style.css` | Layout, color groups, responsive breakpoints, and print styles. |
| `img/` | One image per number (`0.png`, `00.png`, …). |

Deployment is unchanged: push to the `gh-pages` branch and GitHub Pages serves `index.html`.

### Improvements

Pull requests and suggestions are welcome, not just on the layout/style of the page, but on the chosen moves too. Some pokemon could use moves that are easier to imagine, or that make contact so that they can be linked to the target easier, or that associate better with that pokemon.
