
//*All work & code contributed solely by Liam Fernandez */
window.onload = start;
var sourceOfTruth = [];

function start() {
  var width = 900;
  var height = 700;

  var margin = {
    top: 30,
    bottom: 30,
    left: 50,
    right: 50
  }


  var graph = document.getElementById('graph');


  var svg = d3.select(graph)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    var xScale = d3.scaleLinear().range([margin.left, width - margin.right]);
    var yScale = d3.scaleBand().rangeRound([margin.bottom, height-margin.top], 0.3);



    
}



d3.csv("songattributes.csv", function (csv) {
  for (var i = 0; i < csv.length; ++i) {
    csv[i].Title = String(csv[i].Title);
    csv[i].Artist = String(csv[i].Artist);
    csv[i].Year = Number(csv[i].Year); // This is default x-axis value
    csv[i].BeatsPerMinute = Number(csv[i].BeatsPerMinute);
    csv[i].Energy = Number(csv[i].Energy);
    csv[i].Danceability = Number(csv[i].Danceability);
    csv[i].Liveness = Number(csv[i].Liveness);
    csv[i].Valence = Number(csv[i].Valence);
    csv[i].Duration = Number(csv[i].Duration);
    csv[i].Acousticness = Number(csv[i].Acousticness);
    csv[i].Speechiness = Number(csv[i].Speechiness);
    csv[i].Popularity = Number(csv[i].Popularity);
  }

  // CSV[i] = four attributes to it
  // COMPLETE THESE FUNCTIONS TO SEE THE SCATTERPLOTS +++++++++++++++
  var fatExtent = d3.extent(csv, function (row) {
    return row.Fat;
  });
  var carbExtent = d3.extent(csv, function (row) {
    return row.Carb;
  });
  var fiberExtent = d3.extent(csv, function (row) {
    return row.Fiber;
  });
  var proteinExtent = d3.extent(csv, function (row) {
    return row.Protein;
  });
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Axis setup
  var xScale = d3.scaleLinear().domain(fatExtent).range([50, 470]);
  var yScale = d3.scaleLinear().domain(carbExtent).range([470, 30]);

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
        return xScale(d.Fat);
      })
      .attr("cy", function (d) {
        return yScale(d.Carb);
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
    .attr("height", height);

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
      return xScale(d.Fat);
    })
    .attr("cy", function (d) {
      return yScale(d.Carb);
    })
    .attr("r", 5)
    .on("click", function (d, i) {
      var chart1 = document.getElementById("chart1");
      var circles = chart1.getElementsByTagName("circle");
      // circles[i].classed("selected2", true);
      // circles[i].style.fill = "orange";
      circles[i].style.opacity = .5;
      document.getElementById('Fat').innerHTML = d.Fat
      document.getElementById('Carb').innerHTML = d.Carb
      document.getElementById('Fiber').innerHTML = d.Fiber
      document.getElementById('Protein').innerHTML = d.Protein
      // document.getElementById(i).style.fill = "pink";
    });


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
