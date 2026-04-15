---
title: How to Approach Advent of Code 2024 Day 21 Problem?
description: Notes on how I solved the problem in a very efficient way.
date: 2026-1-13
---

Advent of Code 2024 was a really interesting one, The veriety of problems was 
wider than the ones in previous reditions. Also, it was the first AoC challenge 
I completed it to the end and earned 50 stars. Among all the problems, The 
problem on [Day 21](https://adventofcode.com/2024/day/21) was of particular 
interest to me.

As the problem is described quite well by the original creator, I don't find it
necessary to restate the problem here.

## Understanding the Problem

In the first part of the problem there are 3 layers of robots controlling the 
one infront of it, something like the diagram below:

![P1 Diagram](robot-p1.png)

To solve the problem we will bhave to think backwards, starting from the code the
last robot needs we should calculate what the robot just behind it must input.

```
+---+---+---+
| 7 | 8 | 9 |
+---+---+---+
| 4 | 5 | 6 |
+---+---+---+
| 1 | 2 | 3 |
+---+---+---+
    | 0 | A |
    +---+---+
```

zum Biespiel, consider the layout above. This is the layout of the final keypad. 
Initially, the arm of the last robot (lets call it: FinBot) is on key A and we 
want to type "540A". 

To do this, the arm of FinBot should reach the keys in following order: A - 5 
\- 4 - 0 - A. 

Now, Lets take the first step: going A - 5. I observed that no matter what
path I take I will have to move up atleast twice and go left once. Any other
path taken will always contain 2 Up and 1 Left. So, I can safely eliminate the 
paths that are more than 3 steps. This can be proven mathematically by 
[Graph Theory](https://en.wikipedia.org/wiki/Graph_theory). But one can also
understand it intuitively using [Vectors][1].

[1]: https://en.wikipedia.org/wiki/Vector_%28mathematics_and_physics%29

```
    +---+---+
    | ^ | A |
+---+---+---+
| < | v | > |
+---+---+---+
```

The shortest signal the MidBot sends has to be combination of 2 Up and 1 Left: 
`<^^`, `^^<` or`^<^`. Can I eliminate something among these? (For now, I was not
considering the hole that arm should not reach)

Maybe I can? Lets first consider the set of motions that MidBot needs to do for
all three shortlisted options:

1. `^^<`: `A` to `^` - Press Twice - `^` to `<` - Press Once
2. `<^^`: `A` to `<` - Press Once - `<` to `^` - Press Twice
3. `^<^`: `A` to `^` - Press Once - `^` to `<` - Press Once - `<` to `^` - Press
    Once.

Wait! If you observe carefully, the motions of option 3 contains motion of both
option 1 and 2! that means motions of option 3 is superset of both option 1 and 
option 2. And this is true irrespective of shape of keypad. This tells us
something important: **If a grouped path exists, then it will be shorter than any
ungrouped one.**

With this knowledge I simplifed my choices to following:

1. Move Vertically, then Move Horizontally
2. Move Horizontally, then Move Vertically

Let us try to solve this problem by hand to get an idea of how it will work:

```
FinBot: 540A
MidBot: ^^<A<A>vvA>A (2 Choices)
StartBot: <AAv<A>>^Av<<A>>^AvA<AA^>AvA^A (2 * 2 = 4 Choices)
Hand: (I refused to solve this by hand. :|)
```

Here, Observe that any pattern can be breaked into: `{movements} A {movements}
A ...` where A corresponds to every key press. For Example, FinBot needs to type
4 character, therefore MidBot has 4 `A` and 4 `{movements}`in the command it 
sends. and similarly, StartBot has 12 `A` and 12 `{movements}` respectively.

For part 1, I simply did brute force expansion. and found the minimum length
among all the valid solutions. While this naive approach worked for part 1. in
part 2 there are 25 robots in chain! and seeing that the solution expands 
exponentially (napkin math says: approx 2^n) layer to layer, this solution was 
not going to work. I needed something smarter.

## [Dynamic Programming][2] Solution

[2]:(https://en.wikipedia.org/wiki/Dynamic_programming)

I would need super computer to work with strings that large. But wait! AoC only
asked me to find length of smallest string, not the exact string. But, I couldn't
just store the length of the string at the end of each layer, as it would not
provide me enough information to build the command for next layer.

Now, looking back at the layout of keyboard I realized that our keypad has only
5 keys and there are only few sets of motions possible when moving between keys:

To understand it better, lets divide MidBot string into sections:
`^^<A | <A | >vvA | >A`. each section contains: `0-1 step vertically` + `0-2 
steps horizontally` + `A`. This gives us just 23 combinations of movements 
(including one NoOp)! Since, all the robots from MidBot onwards are controlling identical keyboards, the entire command is just combination of these 30 small sub-strings! Irrespective of at which layer the robot is sitting at.

Also, observe that all the sub-strings end at `A`. This means that at the end of
first sub-string, the arm of robot reaches back to `A`, and at the start of 2nd
substring the robot again starts from `A` and so on. That means: **"optimal 
expansion" of each substring is dependent on only on itself.**

Combining the above disovery with the fact that addition is an [Commutative][3]
property, all we need to store is a map of sub-strings and no. of times it occurs.
This provides enough data for next layer to expand upon.

[3]:[https://en.wikipedia.org/wiki/Commutative_property]

And since our substrings are independent, we can find the expansions of each
possible substring ahead of runtime and that is the approach I took.

I did some permuatation and combination and realized that expanding each sub-string
twice gave me a clear answer for which expansion was the most optimal. However,
I do not have definite "math" for why it works.

Here is the [code][4] I used to find the expansions, Its not the best but its
readable enough.

[4]: (https://github.com/pranavtaysheti/advent-of-code/blob/main/2024/21/generate/expansions.py)

And the last part is simple dumb substitution at each layer. This approach solves
P2 in just few ms in my go solution. and perhaps it can solve the problem with
way more layers. but at that point you should be more worried about hitting
limits of `int64`.

Tscheus!
