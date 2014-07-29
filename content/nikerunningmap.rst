====================
NikePlus Running Map
====================

:date: 2014-07-29 11:00
:tags: blog, nikeplus, running, mapbox, tutorial
:author: Drew Bollinger
:slug: nike-plus-running-map
:scripts: nikerunningmap.js
:styles: nikerunningmap.css
:mapbox:

.. _`Mapping Moves`: https://www.mapbox.com/blog/mapping-moves/
.. _`something else`: http://drewbo.com/blog/2014/05/12/nike-plus-elevation/
.. _fullscreen: https://a.tiles.mapbox.com/v4/drewbo19.immnjfdh/page.html?access_token=pk.eyJ1IjoiZHJld2JvMTkiLCJhIjoiWlpRb2lYUSJ9.aT3CQyI2_wYzqKPDqjgvyw#13/38.9105/-77.0424
.. _`Matt Stuehler's site`: https://mattstuehler.com/lab/NikePlus/
.. _Python: https://www.python.org/
.. _TileMill: https://www.mapbox.com/tilemill/
.. _MapBox: https://www.mapbox.com/
.. _togeojson: https://github.com/mapbox/togeojson
.. _`one used for OpenStreetMap exports`: https://github.com/kengggg/osm-gpx-download
.. _`Garrett's blog post`: https://www.mapbox.com/blog/mapping-moves/

.. role:: blue
.. role:: orange
.. role:: green

Inspired by Garrett Miller's (relatively) recent blog post, `Mapping Moves`_, I decided to do `something else`_ with all my NikePlus data
and create a map of my runs.
Unfortunately for me, the Nike data is more difficult to liberate than from other sources. Fortunately for me, and anyone else trying
to do this, there are some pre-existing tools to solve this issue.

!END-SUMMARY!

.. raw:: html

   <div id="map" class="map"></div>

.. class:: center

:blue:`2012` in blue, :orange:`2013` in orange, :green:`2014` in green. View fullscreen_

Before starting
===============

Get these things:

- Python_
- TileMill_
- A MapBox_ account
- togeojson_

The data
========

First, I used `Matt Stuehler's site`_ (again) to export all of my runs as .gpx files. If you have trouble exporting them all at the same time,
it helps to break them up into 30-40 run groups.

The easiest way to import this data into TileMill is going to be as a .geojson file but it will help if we have our data a little more organized
before converting. I had three years of data so I decided that I would eventually want to style it by year. Here's the folder structure I used:

.. image:: /images/folder-structure.png
   :height: 430
   :width: 600
   :align: center
   :alt: Folder Structure

The Python file in each folder is a slight modification of `one used for OpenStreetMap exports`_. I'm going to post it here because I don't like having to
clone a GitHub repo just to grab one file.:

.. code-block:: python

    from bs4 import BeautifulSoup
    import glob
    import time

    output_file_name = "merged.gpx"

    fo = open(output_file_name, "w")
    fo.write('<?xml version="1.0" encoding="UTF-8"?>')
    fo.write('<gpx version="1.0">')

    gpx_list = glob.glob('*/*.gpx')

    for gpx_file_name in gpx_list:
        print "Parsing "+gpx_file_name+" ..."

        fi = open(gpx_file_name,"r")
        gpx_trace = fi.read()
        fi.close()

        soup = BeautifulSoup(gpx_trace)
        fo.write(soup.trk.prettify())

        time.sleep(1)

    fo.write('</gpx>')
    fo.close()

Copy this, save it as gpx-merger.py, and put one in each folder structure like I did above (it needs to be one folder "below" the data
it is aggregating). To run it, navigate to that folder in the command line/terminal and type "python gpx-merger.py". Sit back and wait.

.. image:: /images/terminal.gif
   :height: 338
   :width: 600
   :align: center
   :alt: Terminal gif

Each time you run it in a new place, it will output a file called 'merged.gpx'.
Now you can pretty much follow the rest of `Garrett's blog post`_:

- Use togeojson to convert each merged file into a .geojson file
- Start a new TileMill project and import each file as a separate layer
- Style, then upload to MapBox

Styling tips
============

- Bright colors look awesome.
- Set the 'line-opacity' attribute to ~0.25. This means that it will take four times over the same path to make the line fully opaque and gives a better idea of how often you run in certain areas.
- Use the satellite imagery (requires a basic MapBox account) with a near-black color and saturated filter settings ( >75%).

.. image:: /images/filter-settings.png
   :height: 338
   :width: 600
   :align: center
   :alt: filter settings
