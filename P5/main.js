
//* All work & code contributed solely by Liam Fernandez, Tim Xu, and Rebecca Robbins*/
window.onload = start;
var sourceOfTruth = [];
var currentXscale, currYscale, currXaxis, mainGraphPointer; //For scatter plot
var barXscale, barYscale, barGraphPointer; //For scatter plot
var width = 900;
var height = 720;
var margin = {
  top: 30,
  bottom: 30,
  left: 50,
  right: 50
};

var categories = {
  Acousticness: "Acousticness",
  Speechiness: "Speechiness",
  Liveness: "Liveness",
  Danceability: "Danceability",
  Valence: "Valence",
  Energy: "Energy",
  BeatsPerMinute: "Beats per Minute (BPM)"
}

var dotColors = {
  Pop: "SandyBrown",
  Rock: "Crimson",
  Indie: "DarkCyan",
  Alternative: "Indigo",
  Soul: "LightGreen",
  Other: "MediumOrchid"
}
dotColors["Hip Hop"] = "DodgerBlue";
////////////////////////////////////////////////////////////////////////////////

/*                        END OF GLOBAL VARIABLES                   */

////////////////////////////////////////////////////////////////////////////////



/* MAIN FUNCTION */
function start() {
  createLegend();
  var graph = document.getElementById('graph');
  // var graph2 = document.getElementById('graph2');


  var svg = d3.select(graph)
    .append('svg')
    .attr("class", "chart1")
    .attr('width', width)
    .attr('height', height);

  var mainGraph = svg.append('g')
    .attr('width', width - margin.left - margin.left)
    .attr('height', height - margin.top - margin.bottom);

  var xScale = d3.scaleLinear().range([margin.left, width - margin.right]);
  var yScale = d3.scaleLinear().range([height - margin.top, margin.bottom]);

  var yAxis = d3.axisLeft(yScale);
  var xAxis = d3.axisBottom(xScale);

  var svg2 = d3.select(graph)
    .append("svg")
    .attr('width', width)
    .attr('height', height);

  d3.csv("./songattributes.csv", function (csv) {
    csv.Title = String(csv.Title);
    csv.Artist = String(csv.Artist);
    csv.Genre = String(csv.Genre);
    csv.Year = Number(csv.Year); // This is default x-axis value
    csv.BeatsPerMinute = Number(csv.BeatsPerMinute);
    csv.Energy = Number(csv.Energy);
    csv.Danceability = Number(csv.Danceability);
    csv.Liveness = Number(csv.Liveness);
    csv.Valence = Number(csv.Valence);
    csv.Duration = Number(csv.Duration);
    csv.Acousticness = Number(csv.Acousticness);
    csv.Speechiness = Number(csv.Speechiness);
    csv.Popularity = Number(csv.Popularity);
    csv["category"] = translateGenre(String(csv.Genre));
    return csv;
  }, function (error, data) {
    mainGraphPointer = mainGraph;
    sourceOfTruth = data;
    currentXscale = xScale;
    currXaxis = xAxis;
    currYscale = yScale;

    barGraphPointer = svg2;


    // ! Set up Y-axis before drawing graph
    yScale.domain([0, d3.max(data, function (d) {
      return d.Popularity;
    })]); // Scatter plot

    mainGraph.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + margin.left + ',0)')
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 7)
      .attr("x", -(5 * margin.left))
      .attr("dy", "-3.3em")
      .attr("stroke", "purple")
      .attr("fill", "black")
      .attr("stroke-width", 0.5)
      .text("Popularity of Song");
    //Making the lines that go right of the x axis || GRID LINES
    mainGraph.append('g')
      .call(d3.axisLeft(yScale).ticks(10).tickSize(-width + (margin.right * 2)))
      .attr("opacity", 0.2)
      .attr("transform", "translate(" + margin.left + ",0 )")
      .selectAll(".tick text")
      .attr("font-size", "0");


      d3.select("#inputs")
        .append("text")
        .attr("stroke", "purple")
        .attr("class", "selectText")
        .attr("font", "20px sans-serif")
        .attr("fill", "black")
        .attr("stroke-width", 0.5)
        .text("<- Choose which attribute to plot along the X-axis");

        drawGraph();
    // Start of Plotting Axes for second graph
    

    
    var xScale2 = d3.scaleBand()
		.range([margin.left, (width)])
    .padding(0.5);
    
    var yScale2 = d3.scaleLinear().range([height - margin.top, margin.bottom]);
    
    yScale2.domain([0, 210]);

    var yAxis2 = d3.axisLeft(yScale2);
    console.log(Object.keys(categories));
    xScale2.domain(Object.keys(categories).sort());
    
    var xAxis2 = d3.axisBottom(xScale2)
      .tickSize(10)
      .scale(xScale2);

      barYscale = yScale2;
      barXscale = xScale2;



    svg2.append("g")
      .attr("transform", "translate(" +  margin.left+ ",0)")
      .attr("class", "axis")
      .call(yAxis2)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 7)
      .attr("x", -(5 * margin.left))
      .attr("dy", "-3.3em")
      .attr("stroke", "purple")
      .attr("fill", "black")
      .attr("stroke-width", 0.5)
      .text("Value of attribute");
    //Making the lines that go right of the x axis || GRID LINES
    svg2.append("g")
      .call(d3.axisLeft(yScale2).ticks(10).tickSize(-width + (margin.right)))
      .attr("opacity", 0.2)
      .attr("transform", "translate(" + margin.left + ",0 )")
      .selectAll(".tick text")
      .attr("font-size", "0");
      
      svg2.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0,"+(height - margin.bottom) +")")
      .call(xAxis2);
  });
}



////////////////////////////////////////////////////////////////////////////////

/*                        HELPER FUNCTIONS                   */

////////////////////////////////////////////////////////////////////////////////
function addXlabel(whichAxis) {
  d3.select("#xaxislabel")
    .append("text")
    .attr("class", "xlabel")
      .attr("stroke", "purple")
      .attr("fill", "black")
      .attr("stroke-width", 0.5)
      .text(whichAxis);

  if (document.getElementsByClassName("xlabel").length > 1) {
    document.getElementsByClassName("xlabel")[0].remove();
  }
}


function createLegend() {
  var s = d3.select("#my_dataviz")

  var first = 35, mid = first+20, last = first + 40;

  s.append("text").attr("x", 105).attr("class", "legend").attr("y", 12).text("Legend").style("font-size", "16px").attr("alignment-baseline", "middle")
  s.append("circle").attr("cx", 20).attr("cy", 30).attr("r", 6).style("fill", dotColors["Pop"])
  s.append("text").attr("x", 30).attr("y", first).text("Pop").style("font-size", "15px").attr("alignment-baseline", "middle")
  s.append("circle").attr("cx", 20).attr("cy", 50).attr("r", 6).style("fill", dotColors["Rock"])
  s.append("text").attr("x", 30).attr("y", mid).text("Rock").style("font-size", "15px").attr("alignment-baseline", "middle")
  s.append("circle").attr("cx", 20).attr("cy", 70).attr("r", 6).style("fill", dotColors["Indie"])
  s.append("text").attr("x", 30).attr("y", last).text("Indie").style("font-size", "15px").attr("alignment-baseline", "middle")
  s.append("circle").attr("cx", 100).attr("cy", 30).attr("r", 6).style("fill", dotColors["Alternative"])
  s.append("text").attr("x", 110).attr("y", first).text("Alternative").style("font-size", "15px").attr("alignment-baseline", "middle")
  s.append("circle").attr("cx", 100).attr("cy", 50).attr("r", 6).style("fill", dotColors["Soul"])
  s.append("text").attr("x", 110).attr("y", mid).text("Soul").style("font-size", "15px").attr("alignment-baseline", "middle")
  s.append("circle").attr("cx", 100).attr("cy", 70).attr("r", 6).style("fill", dotColors["Other"])
  s.append("text").attr("x", 110).attr("y", last).text("Other").style("font-size", "15px").attr("alignment-baseline", "middle")
  s.append("circle").attr("cx", 200).attr("cy", 30).attr("r", 6).style("fill", dotColors["Hip Hop"])
  s.append("text").attr("x", 210).attr("y", first).text("Hip Hop").style("font-size", "15px").attr("alignment-baseline", "middle")

  s.attr("transform", "translate(45 , 15)");
  // s.attr("transform", "translate(" +  width / 3+" , 30)"); //Center it under first chart
}

function removeOldDots() {
  if (document.getElementsByClassName("circle").length > 1) {
    mainGraphPointer
      .selectAll("circle")
      .remove();
  }
}

function removeOldBars() {
  if (document.getElementsByClassName("barGraph").length >= 1) {
    d3.selectAll("rect")
      .remove();
    d3.selectAll(".songBar").remove();
  }
}

function grabAxis() {
  var axisChoiceBox = d3.select('#xaxis').node();
  var choice = axisChoiceBox.options[axisChoiceBox.selectedIndex].value;
  return choice;
}

function changeAxis() {
  var oldAxis = document.getElementsByClassName("x axis");
  if (oldAxis.length > 1) {
    oldAxis[0].remove();
    console.log("Removing the element");
  }
}

function translateGenre(genre) {
  var categoryToReturn;

  if (genre.includes("boy band") || genre.includes("pop")) {
    categoryToReturn = "Pop";
  } else if (genre.includes("alternative")) {
    categoryToReturn = "Alternative";
  } else if (genre.includes("rock")) {
    categoryToReturn = "Rock";
  } else if (genre.includes("rap") || genre.includes("hip hop")) {
    categoryToReturn = "Hip Hop";
  } else if (genre.includes("indie") || genre.includes("folk")) {
    categoryToReturn = "Indie";
  } else if (genre.includes("soul")) {
    categoryToReturn = "Soul";
  } else {
    categoryToReturn = "Other";
  }
  return categoryToReturn;

}

function drawBars(index) {
  removeOldBars();
  barGraphPointer.append("g")
  .attr("class", "barGraph")
  .selectAll("bar")
  .data(Object.keys(categories))
  .enter().append("rect")
  .attr("class", "bar")
  .attr("fill", dotColors[sourceOfTruth[index]["category"]])
  .attr("x", function (attr) {
    return barXscale(attr) - 12 + margin.left / 2;
  })
  .attr("y", function (attr) {
    console.log("Should be the Y value -> " + sourceOfTruth[index][attr] +"\n At index -> "+ index);
    return barYscale(sourceOfTruth[index][attr]);
  })
  .attr("width", "20px")
  .attr("height", function (attr) {
    return (height - margin.bottom) - barYscale(sourceOfTruth[index][attr])
  });


  d3.select(".barGraph")
    // .attr("class", "songLabels")
    .append("text")
      .attr("class", "songBar")
      .attr("transform", "translate("+ ((width / 3)) +", 50)")
      .attr("stroke", "yellow")
      .attr("fill", "black")
      .attr("stroke-width", 0.5)
      .text("Song Name: " + sourceOfTruth[index].Title);
  d3.select(".barGraph")
      .append("text")
      .attr("class", "songBar")
      .attr("transform", "translate("+ ((width / 3)) +", 80)")
      .attr("stroke", "darkCyan")
      .attr("fill", "black")
      .attr("stroke-width", 0.5)
      .text("Artist: " + sourceOfTruth[index].Artist);
  
}

function drawGraph() {
  var whichAxis = grabAxis();
  console.log('Attribute to plot among the X -> ' + String(whichAxis));

  // Handle X-Axis creation
  if (whichAxis != "Year") {
    currentXscale.domain([d3.min(sourceOfTruth, function (d) {
      return d[whichAxis];
    })
      ,
    d3.max(sourceOfTruth, function (d) {
      return d[whichAxis];
    })]);
    mainGraphPointer.append("g")
      .attr("class", "x axis")
      .attr("id", "x")
      .attr('transform', 'translate(0,' + (height - margin.top - margin.bottom + 30) + ')')
      .call(currXaxis);

  } else {
    currentXscale.domain([1999, d3.max(sourceOfTruth, function (d) {
      return d[whichAxis];
    }) + 1]);
    mainGraphPointer.append("g")
      .attr("class", "x axis")
      .attr("id", "x")
      .attr('transform', 'translate(0,' + (height - margin.top - margin.bottom + 30) + ')')
      .call(d3.axisBottom(currentXscale)
        .ticks(20)
        .tickFormat(d3.format("d"))
      );
  }
  changeAxis(); // DO NOT REMOVE -- End of creating x axis
  addXlabel(whichAxis);



  var div = d3
    .select("#graph")
    .append("div")
    .attr("class", "song-info")
    .style("opacity", 0);


  removeOldDots();
  var circles1 = mainGraphPointer
      .selectAll("circle")
      .data(sourceOfTruth.filter(function (d) {
        if (d.Year > 1999) {
          return d;
        }
      }))
      .enter()
      .append("circle")
      .attr("class", "circle")
      .attr("id", function (d, i) {
        return i;
      })
      .attr("fill", function (d) {
        return dotColors[d["category"]];
      })
      .attr("stroke", "black")
      .attr("cx", function (d) {
          return currentXscale(d[whichAxis]);
      })
      .attr("cy", function (d) {
          return currYscale(d.Popularity);
      })
      .attr("r", 4)
      .on("click", function (d,i) {
        drawBars(i);
      })
      //End of code to plot points
      .on('mouseover', function(d, i) {
        d3.select(this).transition()
               .duration('50')
               .attr('opacity', '.85');

        div.transition()
        .duration(50)
        .style("opacity", 1);

      div.html("Title: " + d.Title + "<br>" + "Artist: " + d.Artist + "<br>" + "Click for more details")
        .style("left", (d3.event.pageX + 10) + "px")
        .style("top", (d3.event.pageY - 15) + "px");

    })
    .on('mouseout', function (d, i) {
      d3.select(this).transition()
        .duration('50')
        .attr('opacity', '1');
      div.transition()
        .duration('50')
        .style("opacity", 0);

    })
    
    ;

}
$(document).ready(function () {
  $("div").click(function (event) {
    if (event.target.nodeName != "circle") {
      removeOldBars();
    }
  });
});


////////////////////////////////////////////////////////////////////////////////

/*                        END OF HELPER FUNCTIONS                   */

////////////////////////////////////////////////////////////////////////////////