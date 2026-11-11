# pokenum

A way to remember numbers using Pokemon.

If you're a fan of Pokemon and would like to use them to remember numbers, consider using this method.

### Usage

Take any sequence of a number, such as a common phone number: `(253) 200-4433`. Break it up into pairs `25` `32` `00` `44` `33`. Each pair will be representing a pokemon or a move, alternating between the two. The sequence will be memorized by having a pair interact with the next.

In this case, the first `25` which is pikachu, will be our first pokemon. If this phone number belongs to someone, it's easier to imagine this scene happening in a place in which you usually interact with this person, or where you've met them. The next pair will represent a move that the previous pokemon will perform. `32`, so pikachu will be using double kick on the next pokemon, represented by the next pair. And finally that pokemon will use the next pair as its move, which will target the next pokemon.

Alternating between a pokemon and a pokemon moves helps lower the amount of creativity required. Thus memorizing and recalling a sequence will take less time. The final scene will be pikachu using double kick on missingno, missingno using protect on nidorino.

Use your imagination for how double kick and protect will look. I like the idea of pikachu hitting its target with both of its feet and then using it as support for a backflip. For attacks like protect which do not make contact with the target, try to imagine a way in which it does interact with the target. In this case I will imagine missingno walking into nidorino as the protect "disc" spins around it.

### Who should use this?

Consider learning this if you care enough about being able to remember a sequence of numbers. At first, it will take longer to remember and to recall. The indices include getting a number from a pokemon/move and vice versa. Remembering a pokemon from a move is not necessary, it's mainly used to help associate the two with the number.

If you're not a pokemon fan or don't want to use them for this, you can use whatever else. I got this idea from the book [How to Develop a Perfect Memory](http://amzn.to/16HWbVE) by Dominic O'Brien. He suggested converting the numbers into letters and associating those letters with whatever comes to mind first. I found it more fun to make a list of pokemon and use that instead.

### Weekday groups

The seven colors on the pair cards are weekdays: Sunday (`0`) through Saturday (`6`).

This weekday trick is Dominic O’Brien’s Human Calendar method, described in *How to Develop a Brilliant Memory Week by Week* (Step 35, “How to Become a Human Calendar”).

The `0`–`9` cards are single-digit entries, not year cards; they have no weekday color. Use the two-digit `00`–`99` cards for the calendar method.

### Using the cards

The pair card’s group is the year code. To find the weekday of a date in 1900–1999:

1. Find card `NN` for year `19NN`; note its group (0 = Sunday … 6 = Saturday).
2. Add the month code.
3. Add the day of the month.
4. Take the total modulo 7. 0 = Sunday, 1 = Monday, … 6 = Saturday.

| Month | Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Code | 0/6 | 3/2 | 3 | 6 | 1 | 4 | 6 | 2 | 5 | 0 | 3 | 5 |

Jan and Feb use the second value in leap years. 1900 is not a leap year.

O’Brien’s method uses a century code outside 1900–1999. For 2000 the correction is +6: 100 years plus 25 leap days is 36,525 days, and 36,525 mod 7 = 6.

Examples:

- July 4, 1976: card `76` is group 4; July code 6; 4 + 6 + 4 = 14; 14 mod 7 = 0 → Sunday.
- December 31, 1999: card `99` is group 4; December code 5; 4 + 5 + 31 = 40; 40 mod 7 = 5 → Friday.
- February 29, 2000: the cards cover 1900–1999, so use year code 6 for 2000 (the `00` group plus 6); February leap code 2; 6 + 2 + 29 = 37; 37 mod 7 = 2 → Tuesday.

### Improvements

Pull requests and suggestions are welcome, not just on the layout/style of the page, but on the chosen moves too. Some pokemon could use moves that are easier to imagine, or that make contact so that they can be linked to the target easier, or that associate better with that pokemon.

### Development

The page is a pre-rendered static site. There is no runtime JavaScript and no dependencies; `index.html` is generated from `template.html` and `pokemon.json` by `build.js`.

```sh
npm run build   # validate the data and regenerate index.html
npm start       # serve the page at http://localhost:8000
```

`index.html` is fully pre-rendered, so you can also open it directly in a browser without a server. It is generated from `template.html` and `pokemon.json`, so edit those and then run `npm run build`.

## Credits

Pokemon sprites are sourced from [Veekun](https://veekun.com/), [PokeAPI sprites](https://github.com/PokeAPI/sprites), [pret/pokefirered](https://github.com/pret/pokefirered), and [pret/pokeemerald](https://github.com/pret/pokeemerald).

Pokemon is a trademark of Nintendo, Creatures Inc., and GAME FREAK inc. This is an unofficial fan project and is not affiliated with or endorsed by them.
