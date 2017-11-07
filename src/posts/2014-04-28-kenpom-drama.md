---
title: New KenPom Metric
layout: post.html

---

<style>
table { width: 90%; }
</style>

In the process of writing an article about March Madness ticket prices
(coming soon), I ended up on [kenpom.com](http://kenpom.com/), an
absolutely fantastic site for college basketball analysis. The rankings
and associated metrics produced by the site's namesake, Ken Pomeroy,
have become nearly industry standard for coaches and fans alike. Note
that parts of the site are behind a paywall but if you have even the
slightest overlapping interesting in college basketball and statistics,
it's definitely worth the subscription fee of $19.99.

The whole site is worth a look but I'd like to focus on one particular
statistic here: win probability.

## Win Probability

Win Probability, or Win Expectancy, is a way of answering the question,
"Given the current game state, what are the chances a selected team wins
the game?" To figure this out, we look back at previous games to find
similar situations (score differential, time remaining, etc.) and see
how many times those games ended in a given result. For instance, if a
team was leading by 20 at halftime in a college basketball game, they
end up winning about 94% of the time.

This can be applied to all sports:
[Fangraphs](http://www.fangraphs.com/library/misc/we/) has a nice primer
on the idea in the context of baseball that's worth a read. For college
basketball, [Ken Pomeroy has created a
model](http://kenpom.com/blog/index.php/weblog/entry/win_probability_for_grown_ups)
based on historical data and his own ratings to [create win probability
graphs for each
game](http://kenpom.com/blog/index.php/weblog/entry/win_probability_for_every_college_game).
I used [Highcharts.js](http://www.highcharts.com/) to reproduce one of
these graphs below:

Script failed to load

The game was 30-27 at halftime and Michigan slowly pulled away before it
got a bit close in the waning minutes. Given that Stanford had a shot to
tie at the end, it seems like these probabilities may be overstated but
I'll include KenPom's word of caution from the post linked above here:

> A note of caution when using probabilities: It’s worth mentioning that
> 90% doesn’t mean 100%. A team with a true 90% win probability is in a
> great position, but they will lose 10% of the time. In addition, these
> are win probabilities, not chance-of-game-getting-interesting
> probabilities. If this system is calibrated, a team with a 90% chance
> of winning will lose 10% of the time, but the game will become
> interesting significantly more often than that. The 90% team will even
> trail in more than 10% of the cases, because all this method cares
> about is the end result. (End of note of caution.)

Note that the graphs on KenPom's site also show the game score and
introduce the concept of leverage (how important each possession is) but
I don't want to liberate everything from behind the paywall.

## Game Drama

While Win Probability (WP) is a great way to quantify current game
state, I wanted to expand it into something which described the game as
a whole. As such, I'd like to introduce the concept of "game drama". The
goal of this statistic is to quantify how "crazy" the game was as
measured in changes to WP. I'm probably not the first to experiment with
this idea but I'm going to try some new things to refine it a bit.

The basic concept is to sum up the total vertical movement of the WP
graph. As a fan, you experience each of these swings as stress or
excitement in realizing your team is either further or closer to winning.
In R, it looks like this:

```r
sum(abs(diff(yvalues)))
```

In my data, I refer to this as 'totalDrama'. I've also divided by
possessions to control for longer or shorter games[<sup>[1]</sup>](#footnote-1); this shows up as
'perDrama' in the data[<sup>[2]</sup>](#footnote-2). The game shown above had a Drama score of 4.29
(meaning it's total movement was 4.29 times the height of the graph) and
a 3.25% change in WP per possession. For the past season, this was
1600th most dramatic game out of the 5477 games with available data.

Sorting by totalDrama tends to put longer games on top (not necessarily
a flaw if you like long, roller-coaster games). The possession
controlled metric attempts to control for this a bit but still leaves a
lot of OT games on top. You can view this as either (1) a flaw in the
metric or (2) an accurate reflection of the fact that lots of drama goes
into forcing overtime and especially remaining tied through multiple
overtimes.

The two extensions of the metric I'd like to explore in the future:

1.  Is there a way to "penalize" games with lots of fouls at the end? It
    does keep the game closer (and potentially lead to game-winning
    shots later on) but the drama tends to let down during free-throws.
2.  Which individual possession had the biggest WP impact? They will all
    likely be buzzer beaters but which was the most unlikely?

I'll get to those at some point in the future but without further ado,
here's the link to the [project page]() which contains all of last
year's drama scores.

## Selected Games

This whole concept is non-predictive and mostly offers a retroactive
look at which games were the most dramatic over a given season. As such,
I've selected a few games to display just to gut check the statistic.
Even if some of them look like they are being played in high school
gyms, it's hard to deny that the following games didn't get the blood
pressure up.

### Top 5 Most Dramatic College Basketball Games of 2014 (on a per possession basis)

| Game                                               | Pos. | totalDrama | perDrama |
| -------------------------------------------------- | ---- | ---------- | -------- |
| [Arkansas St. 116 Arkansas Little Rock 114]()  (4OT) | 96   | 14.02 | 7.46% |
| [Purdue 77 Minnesota 74]()  (3OT)                    | 77   | 10.84 | 7.09% |
| [Iowa St. 98 Oklahoma St. 97]()  (3OT)               | 90   | 12.52 | 6.77% |
| [Sacramento St. 78 Weber St. 75]()  (OT)             | 70   | 9.20  | 6.57% |
| [Portland St. 81  Montana 78]() (3OT)                | 77   | 10.18 | 6.57% |

The Arkansas St./Arkansas Little Rock game is insanely far away from the
pack in totalDrama. As mentioned above, it gets some benefit for going
to extra overtimes even when controlling for possessions. I've included
links to all the highlights; I'd especially recommend the Sacramento St.
game as it features a pretty ridiculous combination of late game shots
(turn your headphones/speakers down first).

### Top 5 Least Dramatic College Basketball Games of 2014 (on a per possession basis)

| Game                               | Pos. | totalDrama | perDrama |
| ---------------------------------- | ---- | ---------- | -------- |
| Pittsburgh 84 Howard 52            | 62   | 0.0189     | 0.015%   |
| Iowa 109 Maryland Eastern Shore 63 | 82   | 0.0220     | 0.013%   |
| San Diego St. 76 Southern Utah 39  | 63   | 0.0137     | 0.011%   |
| Louisville 99 Cornell 54           | 76   | 0.0162     | 0.010%   |
| Iowa 86 Arkansas Pine Bluff 61     | 76   | 0.0155     | 0.010%   |

The teams that won these games were heavily favored going in and never
relented. Thus, the WP line never moved very far off one edge of the
graph. So unless you were looking forward to a blowout, I apologize to
anyone who had to watch one of these games (I didn't even include links
for them). Good for Iowa for blowing away two overmatched opponents I
guess?

### Top 3 Most Dramatic March Madness Games of 2014 (on a per possession basis)

| Game                                 | Pos. | totalDrama | perDrama |
| ------------------------------------ | ---- | ---------- | -------- |
| Wisconsin 64 Arizona 63 (OT)         | 61   | 7.40       | 5.92%    |
| North Dakota St. 80 Oklahoma 75 (OT) | 72   | 7.92       | 5.46%    |
| Dayton 55 Syracuse 53                | 58   | 6.40       | 5.37%    |

Having watched a good deal of tournament games, I was surprised how low
these were rated compared to the top games above. For one, the statistic
doesn't take into account the stakes of the game, so it's hard to
recreate the "win-or-go-home" feel in mathematical form. But another
thing it illustrates is that "dramatic" games don't necessarily imply
good basketball. The Dayton/Syracuse game was a low-possession but also
low scoring game that was pretty difficult to watch. However, it did
stay relatively close throughout and come down to the wire, in the
process experiencing a lot of swings in Win Probability.

Let me know if you've noticed anything else yourself or have suggestions
about the metric. Here's another data link to the [project page]().

---

1. <a name="footnote-1"></a> Controlling for number of possession is a hallmark of KenPom metrics.
2. <a name="footnote-2"></a> This is technically the totalDrama divided by number of points in the Win Probability graph which is very close to, or in some cases exactly equal to, possessions * 2.
