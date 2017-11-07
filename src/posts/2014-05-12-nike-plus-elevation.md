---
layout: post.html
title: NikePlus Elevation Tracker
---

I'm taking a quick break from my KenPom data visualization work this
week (though I have made some updates; work in progress on the
[projects](../../../../../pages/projects.html) page) to talk about
another project I've been working on. I'm an avid runner and have an
upcoming race where I'm a little worried about the elevation changes so
I thought bringing in some programming could help.

The [NikePlus](https://secure-nikeplus.nike.com/plus/) app that I use to
track my runs does show changes in pace and elevation (see chart below)
but it doesn't give you any idea of the total change in elevation for
the whole run. Most people do "point-to-point" runs so the net change is
zero but there is still a big difference between 100 feet up then down
and 1,000 feet up then down over the course of a run.

![NikePlus Pace and Elevation Chart](/images/NikePlus-1-20-2013.png)

So, I decided to figure out how to calculate this on my own. I first
used the [this site](https://mattstuehler.com/lab/NikePlus/) by Matt
Stuehler to export my data from NikePlus as .gpx files. Then I wrote a
small function in R to sum all of the changes in elevation throughout
the whole run[<sup>[1]</sup>](#footnote-1). I'd like to eventually
convert this to a standalone Python executable but for now, here's the
code.

```r
elevationstats <- function(month,day,res=1){

## get the file and turn it into a numeric vector

setwd("[folder where the file is]")
filename <- paste("[username]_[year]_",month,"_",day,".gpx",sep="")
fullfile <- read.csv(filename,header=FALSE)
r <- gregexpr("<ele>.*?</ele>",as.character(fullfile[[1,1]]))
x <- regmatches(as.character(fullfile[[1,1]]),r)
elevation_list <- as.numeric(gsub("<ele>|</ele>","",x[[1]]))

## change resolution
new_ele <- elevation_list[c(rep(FALSE,res-1),TRUE)]

## calculate the total elevation gain and loss

total_gain <- sum(diff(new_ele)[diff(new_ele)>0])
total_loss <- sum(diff(new_ele)[diff(new_ele)<0])

c(total_gain,total_loss,length(new_ele))

}
```

Here's what that code does:

  - Opens the specified file and pulls out the relevant data using some
    regular expressions.
  - Sets the "resolution" (you might not want to use every point if you
    think measuring elevation differences every ~10 feet is too much
    detail)
  - Calculates the total elevation gain and loss by summing up the
    differences between each point. It uses two variables to keep track
    of positive and negative differences separately.
  - Outputs the total elevation gain, total elevation loss, and number
    of GPS points used to the R console.

I ran this code on the run pictured above with resolution = 1 (a GPS
point every ~10.9 feet over 9 miles) and got the results:

```r
[381 meters up, 349 meters down, 4377 points]
```

Running it again with resolution = 10 (a GPS points every ~109 feet)
gave:

```r
[295 meters up, 262 meters down, 437 points]
```

The truth is probably somewhere in between, especially given the
variability of GPS data.

If you're a runner who uses NikePlus and is proficient in R, let me know
if this is helpful. Hopefully I can put out a more user-friendly version
in the next few weeks. Happy Trails\!

1.  <a name="footnote-1"></a>I'm just now realizing how incredibly similar this is to my KenPom
    drama metric. My roommate said that he realized this all along when
    I was talking about it and I'm an idiot.
