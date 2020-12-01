var width = 900;
var height = 900;

d3.csv("songattributes.csv", function (csv) {
  for (var i = 0; i < csv.length; ++i) {
    csv[i].BeatsPerMinute = Number(csv[i].BeatsPerMinute);
    csv[i].Energy = Number(csv[i].Energy);
    csv[i].Danceability = Number(csv[i].Danceability);
    csv[i].Liveness = Number(csv[i].Liveness);
    csv[i].Valence = Number(csv[i].Valence);
    csv[i].Duration = Number(csv[i].Duration);
    csv[i].Acousticness = Number(csv[i].Acousticness);
    csv[i].Speechiness = Number(csv[i].Speechiness);
    csv[i].Popularity = Number(csv[i].Popularity);
    csv[i].Title = csv[i].Title;
    csv[i].Artist = csv[i].Artist;
  }

  // CSV[i] = four attributes to it
  // COMPLETE THESE FUNCTIONS TO SEE THE SCATTERPLOTS +++++++++++++++
  var popularityExtent = d3.extent(csv, function (row) {
    return row.Popularity;
  });
  var beatsExtent = d3.extent(csv, function (row) {
    return row.BeatsPerMinute;
  });
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Axis setup
  var xScale = d3.scaleLinear().domain(beatsExtent).range([0, 950]);
  var yScale = d3.scaleLinear().domain(popularityExtent).range([0, 950]);

  var xAxis = d3.axisBottom().scale(xScale);
  var yAxis = d3.axisLeft().scale(yScale);

  function createGraph(chart1) {
    chart1
      .selectAll("circle")
      .data(csv)
      .enter()
      .append("circle")
      .attr("id", function (d, i) {
        return i;
      })
      .attr("stroke", "black")
      .attr("cx", function (d) {
        return xScale(d.BeatsPerMinute);
      })
      .attr("cy", function (d) {
        return yScale(d.Popularity);
      })
      .attr("r", 5)
      .attr("change", function (d, i) {
        document.getElementById(i).style.fill = "black";
      });
  }
  //Create SVGs for charts
  var chart1 = d3
    .select("#chart1")
    .append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .on("click", function (d, i) {
      createGraph(chart1)
    });

  // // clears clicked values
  // $(document).ready(function () {
  //   $("div").click(function (event) {
  //     if (event.target.nodeName != "circle") {
  //       document.getElementById('Fat').innerHTML = ""
  //       document.getElementById('Carb').innerHTML = ""
  //       document.getElementById('Fiber').innerHTML = ""
  //       document.getElementById('Protein').innerHTML = ""
  //       var chart1C = document.getElementById("chart1").getElementsByTagName("circle");
  //       var chart2C = document.getElementById("chart2").getElementsByTagName("circle");
  //       // circles1.classed("selected2", false);
  //       for (var j = 0; j < chart1C.length; j++) {
  //         // chart1C[j].style.fill = "black";
  //         // chart1C[j].style.stroke = "black";
  //         // chart2C[j].style.stroke = "black";
  //         // chart2C[j].style.fill = "black";
  //         chart1C[j].style.opacity = 1;
  //         chart2C[j].style.opacity = 1;
  //       }
  //     }
  //   });
  // });

  /******************************************
  	
    ADD BRUSHING CODE HERE

   ******************************************/
  // chart1
  //   .call(d3.brush()                 // Add the brush feature using the d3.brush function
  //     .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
  //     .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
  //   )

  // chart2
  // .call(d3.brush()                 // Add the brush feature using the d3.brush function
  //   .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
  //   .on("start brush", updateChart2) // Each time the brush selection changes, trigger the 'updateChart' function
  // )

  // // Function that is triggered when brushing is performed
  // function updateChart() {
  //   extent = d3.event.selection
  //   circles1.classed("selected2", function (d) { 
  //     return isBrushed(extent, xScale(d.Fat), yScale(d.Carb)) 
  //   })
  //   circles2.classed("selected2", function (d) { 
  //     return isBrushed(extent, xScale(d.Fat), yScale(d.Carb)) 
  //   })
  // }
 

  // function updateChart2() {
  //   extent = d3.event.selection
  //   circles1.classed("selected2", function (d) { 
  //     return isBrushed(extent, xScale2(d.Fiber), yScale2(d.Protein)) 
  //   })
  //   circles2.classed("selected2", function (d) { 
  //     return isBrushed(extent, xScale2(d.Fiber), yScale2(d.Protein)) 
  //   })
  // }

  // // A function that return TRUE or FALSE according if a dot is in the selection or not
  // function isBrushed(brush_coords, cx, cy) {
  //   var x0 = brush_coords[0][0],
  //     x1 = brush_coords[1][0],
  //     y0 = brush_coords[0][1],
  //     y1 = brush_coords[1][1];
  //   return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
  // }

  //add scatterplot points
  var circles1 = chart1
    .selectAll("circle")
    .data(csv)
    .enter()
    .append("circle")
    .attr("id", function (d, i) {
      return i;
    })
    .attr("fill", "black")
    .attr("stroke", "black")
    .attr("cx", function (d) {
      return xScale(d.BeatsPerMinute);
    })
    .attr("cy", function (d) {
      return yScale(d.Popularity);
    })
    .attr("r", 5)
    .on("click", function (d, i) {
      var chart1 = document.getElementById("chart1");
      var circles = chart1.getElementsByTagName("circle");
      // circles[i].classed("selected2", true);
      // circles[i].style.fill = "orange";
      // circles[i].style.opacity = .5;
      document.getElementById('Title').innerHTML = d.Title
      document.getElementById('Artist').innerHTML = d.Artist
      document.getElementById('BPM').innerHTML = d.BeatsPerMinute
      document.getElementById('Popularity').innerHTML = d.Popularity
      // document.getElementById(i).style.fill = "pink";
    })
    ;

  chart1 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(0," + (width - 30) + ")")
    .call(xAxis) // call the axis generator
    .append("text")
    .attr("class", "label")
    .attr("x", width - 16)
    .attr("y", -6)
    .style("text-anchor", "end")
    ;

  chart1 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(50, 0)")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");
});
