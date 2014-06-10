===============================
Baby's First Data Visualization
===============================

:date: 2014-05-05 23:30
:tags: d3, kenpom, blog, college basketball
:author: Drew Bollinger
:slug: first-data-vis

.. _`created last week`: http://drewbo.com/blog/2014/04/28/kenpom-drama/
.. _kenpom: http://kenpom.com/
.. _`my earlier post`:
 http://drewbo.com/blog/2014/04/28/kenpom-drama/
.. _`direct link`: ../../../../../pages/kpvis.html
.. _`project page`: ../../../../../pages/projects.html
.. _here: http://kenpom.com/blog/index.php/weblog/four_factors/
.. role:: strike

Though I've put up a few smaller exercises before, I finally have a draft version of the first full data visualization that I've done the majority of the work on [#]_. 
It's based on a metric I `created last week`_ using kenpom_ data.


!END-SUMMARY!


It's not especially pretty or user friendly yet but, in the broadest sense of the word, it works. Check it out at the `direct link`_ or on the `project page`_ and let me know what you think.

Here's an short explanation of the axes since the project page is still light on info:

- x-axis: perDrama, a measure of game excitement described in `my earlier post`_
- y-axis: combined eFG%, based on Dean Oliver’s four factors concept described here_.
- Circle radius is based on "Hype", the scaled harmonic mean of kenpom ratings entering the game with an added "penalty" for the lower ranked team. The exact formula (where ranking equals the 351 - the kenpom ranking) looks like:

$$ max( \\left (\\frac{2* rating_{1} * rating_{2} }{rating_{1} + rating_{2}}  \\right ) - (351 - min(rating_{1},rating_{2})) - 200, 1) $$

Missing features/bugs:

- :strike:`Can't select multiple teams/conferences`
- :strike:`Selections options don't update dynamically (which allows for lots of null selections if you aren't as familiar with college basketball) and` teams are poorly organized
- :strike:`No colors to distinguish conferences or teams`
- :strike:`No legend, title, or sufficient explanations`
- A little slow (we'll find out soon if it's the ~5500 data points or my non-elegant code)
- Needs additional formatting
- ...?

Next week I'll share an updated version as well as some of the interesting basketball narratives that you can confirm/debunk using it.


.. container:: separator

   |

.. [#] I'll also give a lot of credit to my co-workers Ross and Ilan for talking the idea over with me, as well as Mike Bostock, Scott Murray, Steve Hall, and Justin Palmer for their libraries, tutorials, and code examples.
