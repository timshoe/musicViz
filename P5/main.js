
//* All work & code contributed solely by Liam Fernandez */
window.onload = start;
var sourceOfTruth = [];
var currentXscale, currYscale, currXaxis,mainGraphPointer;
var width = 900;
var height = 700;
var margin = {
  top: 30,
  bottom: 30,
  left: 50,
  right: 50
};

var dotColors = {
  Pop: "DarkMagenta",
  Rock: "Crimson",
  Indie: "DarkCyan",
  Alternative: "Indigo",
  Soul: "LightGreen",
  Other: "MediumOrchid"
}
dotColors["Hip Hop"] = "DodgerBlue";

////////////////////////////////////////////////////////////////////////////////

/*                        HELPER FUNCTIONS                   */

////////////////////////////////////////////////////////////////////////////////


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
  switch (genre){
    case (genre.includes("boy band")):
    case (genre.includes("pop")):
      categoryToReturn = "Pop";
      break;
    case (genre.includes("alternative")):
      categoryToReturn = "Alternative";
      break;
    case (genre.includes("rock")):
      categoryToReturn = "Rock";
      break;
    case (genre.includes("rap")):  
    case (genre.includes("hip hop")):
      categoryToReturn = "Hip Hop";
      break;
    case (genre.includes("folk")):
    case (genre.includes("indie")):
      categoryToReturn = "Indie";
      break;
  case (genre.includes("soul")):
    categoryToReturn = "Soul";
    break;
    default:
      categoryToReturn = "Other";
      break;
  }
  return categoryToReturn;

}

function drawGraph() {
  var whichAxis = grabAxis();
  console.log('Attribute to plot among the X -> ' + String(whichAxis));

  // Handle X-Axis creation
  if (whichAxis != "Year") {
    currentXscale.domain([d3.min(sourceOfTruth, function(d) {
      return d[whichAxis];
    }) 
    , 
    d3.max(sourceOfTruth, function(d) {
      return d[whichAxis];
    })]); 
    mainGraphPointer.append("g")
      .attr("class", "x axis")
      .attr('transform', 'translate(0,'  + (height - margin.top - margin.bottom + 30) + ')')
      .call(currXaxis);
  } else {
    currentXscale.domain([1999, d3.max(sourceOfTruth, function(d) {
      return d[whichAxis];
    }) + 1]); 
    mainGraphPointer.append("g")
      .attr("class", "x axis")
      .attr('transform', 'translate(0,'  + (height - margin.top - margin.bottom + 30) + ')')
      .call(d3.axisBottom(currentXscale)
              .ticks(20)
              .tickFormat(d3.format("d"))
        );
  }    
  changeAxis(); // DO NOT REMOVE

  if (document.getElementsByClassName("circle").length > 1) {
    mainGraphPointer
      .selectAll("circle")
      .remove();
  }

  var circles1 = mainGraphPointer
      .selectAll("circle")
      .data(sourceOfTruth)
      .enter()
      .append("circle")
      .attr("class", "circle")
      .attr("id", function (d, i) {
        return i;
      })
      .attr("fill", "black")
      .attr("stroke", "black")
      .attr("cx", function (d) {
        if (d.Year > 1999) {
          return currentXscale(d[whichAxis]);
        }
      })
      .attr("cy", function (d) {
        if (d.Year > 1999) {
          return currYscale(d.Popularity);

        }
      })
      .attr("r", 5);

      


}


////////////////////////////////////////////////////////////////////////////////

/*                        END OF HELPER FUNCTIONS                   */

////////////////////////////////////////////////////////////////////////////////





/* MAIN FUNCTION */
function start() {
  
  var graph = document.getElementById('graph');


  var svg = d3.select(graph)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

  var mainGraph = svg.append('g')
    .attr('width', width - margin.left - margin.left)
    .attr('height', height - margin.top - margin.bottom);

  var xScale = d3.scaleLinear().range([margin.left, width - margin.right]);
  var yScale = d3.scaleLinear().range([height - margin.top, margin.bottom]);

  var yAxis = d3.axisLeft(yScale);
  var xAxis = d3.axisBottom(xScale);

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
  } , function (error, data) {
    mainGraphPointer = mainGraph;
    sourceOfTruth = data;
    currentXscale = xScale;
    currXaxis = xAxis;
    currYscale = yScale;

    console.log("Line 2 test of source of truth: " + sourceOfTruth[1].category);



    // ! Set up Y-axis before drawing graph
    yScale.domain([0, d3.max(data, function(d) {
      return d.Popularity;
    }) + 5]);
    // yScale.domain

    mainGraph.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate('+ margin.left+',0)')
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 7)
      .attr("x", -(5* margin.left))
      .attr("dy", "-3.3em")
      .attr("stroke", "purple")
      .attr("fill", "black")
      .attr("stroke-width", 0.5)
      .text("Popularity of Song");

    drawGraph();
  });
    
}
// d3.csv("./songattributes.csv", function (csv) {
//   for (var i = 0; i < csv.length; ++i) {
//     csv[i].Title = String(csv[i].Title);
//     csv[i].Artist = String(csv[i].Artist);
//     csv[i].Year = Number(csv[i].Year); // This is default x-axis value
//     csv[i].BeatsPerMinute = Number(csv[i].BeatsPerMinute);
//     csv[i].Energy = Number(csv[i].Energy);
//     csv[i].Danceability = Number(csv[i].Danceability);
//     csv[i].Liveness = Number(csv[i].Liveness);
//     csv[i].Valence = Number(csv[i].Valence);
//     csv[i].Duration = Number(csv[i].Duration);
//     csv[i].Acousticness = Number(csv[i].Acousticness);
//     csv[i].Speechiness = Number(csv[i].Speechiness);
//     csv[i].Popularity = Number(csv[i].Popularity);
//   }

//   // CSV[i] = four attributes to it
//   // COMPLETE THESE FUNCTIONS TO SEE THE SCATTERPLOTS +++++++++++++++
//   var fatExtent = d3.extent(csv, function (row) {
//     return row.Fat;
//   });
//   var carbExtent = d3.extent(csv, function (row) {
//     return row.Carb;
//   });
//   var fiberExtent = d3.extent(csv, function (row) {
//     return row.Fiber;
//   });
//   var proteinExtent = d3.extent(csv, function (row) {
//     return row.Protein;
//   });
//   //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//   // Axis setup
//   var xScale = d3.scaleLinear().domain(fatExtent).range([50, 470]);
//   var yScale = d3.scaleLinear().domain(carbExtent).range([470, 30]);

//   var xAxis = d3.axisBottom().scale(xScale);
//   var yAxis = d3.axisLeft().scale(yScale);

//   function createGraph(chart1) {
//     chart1
//       .selectAll("circle")
//       .data(csv)
//       .enter()
//       .append("circle")
//       .attr("id", function (d, i) {
//         return i;
//       })
//       .attr("stroke", "black")
//       .attr("cx", function (d) {
//         return xScale(d.Fat);
//       })
//       .attr("cy", function (d) {
//         return yScale(d.Carb);
//       })
//       .attr("r", 5)
//       .attr("change", function (d, i) {
//         document.getElementById(i).style.fill = "black";
//       });
//   }
//   //Create SVGs for charts
//   var chart1 = d3
//     .select("#chart1")
//     .append("svg:svg")
//     .attr("width", width)
//     .attr("height", height);

//   //add scatterplot points
//   var circles1 = chart1
//     .selectAll("circle")
//     .data(csv)
//     .enter()
//     .append("circle")
//     .attr("id", function (d, i) {
//       return i;
//     })
//     .attr("fill", "black")
//     .attr("stroke", "black")
//     .attr("cx", function (d) {
//       return xScale(d.Fat);
//     })
//     .attr("cy", function (d) {
//       return yScale(d.Carb);
//     })
//     .attr("r", 5)
//     .on("click", function (d, i) {
//       var chart1 = document.getElementById("chart1");
//       var circles = chart1.getElementsByTagName("circle");
//       // circles[i].classed("selected2", true);
//       // circles[i].style.fill = "orange";
//       circles[i].style.opacity = .5;
//       document.getElementById('Fat').innerHTML = d.Fat
//       document.getElementById('Carb').innerHTML = d.Carb
//       document.getElementById('Fiber').innerHTML = d.Fiber
//       document.getElementById('Protein').innerHTML = d.Protein
//       // document.getElementById(i).style.fill = "pink";
//     });


//   chart1 // or something else that selects the SVG element in your visualizations
//     .append("g") // create a group node
//     .attr("transform", "translate(0," + (width - 30) + ")")
//     .call(xAxis) // call the axis generator
//     .append("text")
//     .attr("class", "label")
//     .attr("x", width - 16)
//     .attr("y", -6)
//     .style("text-anchor", "end")
//     ;

//   chart1 // or something else that selects the SVG element in your visualizations
//     .append("g") // create a group node
//     .attr("transform", "translate(50, 0)")
//     .call(yAxis)
//     .append("text")
//     .attr("class", "label")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 6)
//     .attr("dy", ".71em")
//     .style("text-anchor", "end");
// });
