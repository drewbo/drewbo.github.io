---
title: Baby's First Data Visualization
layout: post.html
---

Though I've put up a few smaller exercises before, I finally have a
draft version of the first full data visualization that I've done the
majority of the work on[<sup>[1]</sup>](#footnote-1). It's based on a metric I [created last
week](../2014-04-28-kenpom-drama) using
[kenpom](http://kenpom.com/) data.

It's not especially pretty or user friendly yet but, in the broadest
sense of the word, it works. [Check it out](/kenpom-drama) and let me know what you
think.

Here's an short explanation of the axes since the project page is still
light on info:

  - x-axis: perDrama, a measure of game excitement described in [my
    earlier post](../2014-04-28-kenpom-drama)
  - y-axis: combined eFG%, based on Dean Oliver’s four factors concept
    described
    [here](http://kenpom.com/blog/index.php/weblog/four_factors/).
  - Circle radius is based on "Hype", the scaled harmonic mean of kenpom
    ratings entering the game with an added "penalty" for the lower
    ranked team. The exact formula (where ranking equals the 351 - the
    kenpom ranking) looks like:

<tex>
max(\left (d\frac{2 * rating_1 * rating_2
}{rating_1 + rating_2} \right ) - (351 -
min(rating_1,rating_2)) - 200, 1)
</tex>

Missing features/bugs:

  - Can't select multiple teams/conferences
  - Selections options don't update dynamically (which allows for lots
    of null selections if you aren't as familiar with college
    basketball) and teams are poorly organized
  - No colors to distinguish conferences or teams
  - No legend, title, or sufficient explanations
  - A little slow (we'll find out soon if it's the ~5500 data points or
    my non-elegant code)
  - Needs additional formatting
  - ...?

Next week I'll share an updated version as well as some of the
interesting basketball narratives that you can confirm/debunk using it.

<div class="footnotes">
1.  <a name="footnote-1"></a>I'll also give a lot of credit to my co-workers Ross and Ilan for
    talking the idea over with me, as well as Mike Bostock, Scott
    Murray, Steve Hall, and Justin Palmer for their libraries,
    tutorials, and code examples.
</div>
