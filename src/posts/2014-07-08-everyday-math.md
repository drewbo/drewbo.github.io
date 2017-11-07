---
title: Everyday Math
layout: post.html
---

Like many pedestrian city-goers, I think about route efficiency a lot:
when to cross, which streets are the least crowded, when to take
diagonals, etc. I also happen to frequent a bar that is somewhat of an
edge case when I try to decide on which route to take. For the first
time, I'm going to apply a little rigor to this problem[<sup>[1]</sup>](#footnote-1).

## The Setup

On many Tuesdays, I exit the Metro at the Capitol South station (bottom
left) and begin heading over to [Capitol
Lounge](http://capitolloungedc.com/) (top right).

![wing-night-map-labeled](/images/wing-night-map-labeled.png)

The first steps of the route should seem obvious: North on 1st, East on
C (shown in blue). Until sometime last year, I would mindlessly take 2nd
north to Pennsylvania, then walk southeast until I arrived (dotted red
line). Then one day, while walking the route with my friend Alex, he
proposed something radical and claimed that it was faster to stay on C
and take 3rd north and backtrack along Pennsylvania (dotted green line).

![wing-night-choices](/images/wing-night-choices.png)

At that point, I wasn't convinced but I decided to give it a go.
Normally, it's fairly easy to intuit which path is faster but in this
case, it didn't seem so obvious. Every week, I would start the consider
the geometry of the situation as...

## An Abstraction

Forget about the above map for a moment.

When walking from the bottom-left corner of a rectangle to the opposite
corner on the top-right, there are two time-equivalent paths we could
take ("up then over" and "over then up"). When we are dealing with a
"dented rectangle", this changes our math a bit. I've constructed a
simple diagram below with a blue dot at our starting point and an orange
one at the break-even point (where either path is time-equivalent):

<div id="vis"></div>

You can move the slider around to change the angle in the upper left
corner. When the angle decreases from 90, our break-even point starts to
move along the top diagonal to the left. If our destination is on:

  - the right of the break-even point, we should take the bottom and
    right path, then backtrack along the diagonal.
  - the left of the break-even point, we should take the left path then
    go southeast along the diagonal.

After playing with this abstraction for a bit (first mentally and later
while writing this post) and looking back at the map above, it's
apparent that the destination is really close to what we would naively
guess the break-even point to be. So, I had to break down and do...

## The Math

Solving for the break-even point isn't actually too difficult[<sup>[2]</sup>](#footnote-2) : The
distance traveled along 2nd plus a portion (x) of Pennsylvania needs to
be equal to the distance traveled along C, then 3rd, then the
complementary portion of Pennsylvania. Expressed as a formula:

$$ [height](){1} + \\frac{x \* width}{sin( \\theta )} = width +
[height](){2} + \\frac{(1-x) \* width}{sin( \\theta )} $$

And solving for x:

$$ x = \\big( width + ([height](){2} - [height](){1}) +
\\frac{width}{sin( \\theta )}\\big) \* \\big( \\frac{sin( \\theta)
}{2\*width} \\big) $$

Probably not something you can rattle off in your head although it does
reduce very nicely if width = height:

$$ x = block unit \* \\frac{ sin(\\theta) - cos(\\theta) + 1}{2} $$

## The Final Solution

My very low tech solution for solving this was to look at the pixel
values in the map and plug the corresponding lengths in the formulae
above. We end up with x ≈ .7136 which shows up on the map like this:

![wing-night-solution](/images/wing-night-solution.png)

As suspected, the break-even point is **super** close to Capitol Lounge
which is why this case was so hard to intuit without resorting to math.
However, it is slightly faster (depending upon the accuracy of my
measurements) to take the "southern" route as proposed by my friend
Alex. And if you're rushing to get there before Happy Hour ends at 7,
every little bit counts.

## Update

After writing this post, I realized that, should one be willing to bend
the rules of the road a bit, the northern route is actually faster.
Proposed route:

![wing-night-update](/images/wing-night-update.png)

The diagonal across the road saves enough distance that I feel
comfortable saying it's a little faster given how close the break-even
point was. So, there goes all that work above.

1.  <a name="footnote-1"></a>I finally decided to dissect this relatively trivial problem after
    reading the excellent posts [Kill
    Math](http://worrydream.com/KillMath/) and [Don't Kill
    Math](http://www.evanmiller.org/dont-kill-math.html) regarding
    visualization and mathematics education.

2.  <a name="footnote-2"></a> Although if you get any joy in watching a math major screw up some
    simple trig identities, you would have enjoyed looking over my
    shoulder while writing this.
