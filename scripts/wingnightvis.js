// normal stuff; taken from the mbostock slider demo

var margin = {top: 25, right: 25, bottom: 25, left: 25},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.bottom - margin.top;

var x = d3.scale.linear()
    .domain([45, 90])
    .range([width/4, width*3/4])
    .clamp(true);

var brush = d3.svg.brush()
    .x(x)
    .extent([0, 0])
    .on("brush", brushed);

var svg = d3.select("#vis").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(function(d) { return d + "°"; })
      .tickSize(0)
      .tickPadding(12))
  .select(".domain")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "halo");

var slider = svg.append("g")
    .attr("class", "slider")
    .call(brush);

slider.selectAll(".extent,.resize")
    .remove();

slider.select(".background")
    .attr("height", height);

var handle = slider.append("circle")
    .attr("class", "handle")
    .attr("transform", "translate(0," + height + ")")
    .attr("r", 9);


slider
    .call(brush.extent([90, 90]))
    .call(brush.event);

// draw all the shapes

  var shape = d3.select("svg")
                .append("g")
                .attr("class","shape")
                .attr("transform", "translate(" + width*3/10 + "," + margin.top + ")");
  ;

    shape.append("line")
       .attr("class","line")
       .attr("x1",0)
       .attr("x2",0)
       .attr("y1",0)
       .attr("y2",400);
  
    shape.append("line")
       .attr("class","line")
       .attr("x1",0)
       .attr("x2",400)
       .attr("y1",400)
       .attr("y2",400);
    
      shape.append("line")
       .attr("class","line top")
       .attr("x1",0)
       .attr("x2",400)
       .attr("y1",0)
       .attr("y2",0);
      
      shape.append("line")
       .attr("class","line side")
       .attr("x1",400)
       .attr("x2",400)
       .attr("y1",0)
       .attr("y2",400);
      
      shape.append("path")
       .attr("class","line angle")
       .attr("d","M0,50 A 50 50 0 0 0 50 0 ");

      shape.append("text")
       .attr("class","label angtext") 
       .attr("x",10)
       .attr("y",70)
       .text(brush.extent()[0] + "°")
      
      shape.append("circle")
      .attr("class","bepoint")
      .attr("cx",400)
      .attr("cy",0)
      .attr("r",10)
      .attr("fill","orange")
      .attr("opacity",0.7);

      shape.append("circle")
      .attr("cx",0)
      .attr("cy",400)
      .attr("r",10)
      .attr("fill","blue")
      .attr("opacity",0.5);
      
function brushed() {
  var value = brush.extent()[0];
  
  if (d3.event.sourceEvent) { // not a programmatic event
    value = x.invert(d3.mouse(this)[0]);
    brush.extent([value, value]);
  }

  var vir = brush.extent()[0] * Math.PI / 180;
  var newpoint = 400/Math.tan(vir);
  var beprop = (Math.sin(vir) - Math.cos(vir) + 1)/2; 
  
  handle.attr("cx", x(value));
  
 d3.select(".top")
    .transition()
    .attr("y2", newpoint);
  
  d3.select(".side")
    .transition()
    .attr("y1",newpoint); 
  
  d3.select(".angle")
    .transition()
    .attr("d","M0,50 A 50 50 0 0 0 " + (50 * Math.sin(vir)) + " " + (50 * Math.cos(vir)));
  
  d3.select(".angtext")
    .transition()
    .text(Math.round(value) + "°")
  
  d3.select(".bepoint")
    .transition()
    .attr("cx", beprop * 400)
    .attr("cy", beprop * newpoint)
}