var w = 1200;
var h = 800;
var margin = 5; 
var r = 20;

// create an svg canvas
var canvas = d3.select("#canvas")
				.append("svg")
				.attr("width", w)
				.attr("height", h)
				.style("background-color", "black")

var rainData = [

    {
        Name: "Oliver",
        S10: 13, 
        s20: 24, 
        s30: 37, 
        s40: 44, 
        s50: 60, 
        s60: 69
    }, 
    {
        Name: "Emil",
        S10: 12, 
        S20: 19, 
        S30: 30, 
        S40: 40, 
        S50: 52, 
        S60: 60
    },
    {
        Name: "Phi Va",
        S10: 9, 
        S20: 12, 
        S30: 20, 
        S40: 29, 
        S50: 39, 
        S60: 50
    },
    {
        Name: "Viggo",
        S10: 6, 
        S20: 12, 
        S30: 19, 
        S40: 25, 
        S50: 30, 
        S60: 40
    }
];



var categories = ["10 steps", "20 steps", "30 steps", "40 steps", "50 steps", "60 steps"];
var gridHeight = (h - 2 * margin) / categories.length;
var gridWidth = (w - 2 * margin) / rainData.length;
var s10_sorted = ["6", "9", "12", "13"]
var s20_sorted = ["12", "12", "19", "24"]
var s30_sorted = [ "19", "20", "30", "37"]
var s40_sorted = ["25", "29", "40", "44"]
var s50_sorted = ["30", "39", "52", "60"]
var s60_sorted = ["40", "50", "60", "69"]


categories.forEach(function(category, categoryIndex) {
    canvas.append("line")
        .attr("x1", margin)
        .attr("y1", h - margin - categoryIndex * gridHeight)
        .attr("x2", w - margin)
        .attr("y2", h - margin - categoryIndex * gridHeight)
        .attr("stroke", "white");

        canvas.append("text")
        .attr("x", w - margin*20) // Position to the right of the grid lines
        .attr("y", h - margin - categoryIndex * gridHeight-20)
        .attr("dy", "0.3em") // Adjust vertical alignment if needed
        .attr("text-anchor", "start") // Anchor text to the start (left)
        .attr("dominant-baseline", "middle") // Center text vertically
        .attr("fill", "white")
        .style("font-size", "20px")
        .text(category); // Use category name as text
});
// categories.forEach(function(category, i){
//         var cat_data = rainData.find(function(d) {
//             return d.category === category;
//         });

function Choose_color(i){
    
    if (i === 0) {
        color = "blue" 
    } if (i===1) 
    {
        color = "green"

    }
    if (i === 2) {
        color = "red" 
    } if (i===3) 
    {
        color = "yellow"

    }
    return color 
}

function Transform_arr(array, y, x) {

array.forEach(function(raindrop, i) {
    
        console.log(raindrop)
        var group = canvas.append("g")
        .attr("transform", `translate(${margin + i * gridWidth + x}, ${h - margin - y})`);  // Adjust the values to move right and up

    // Draw the main circle
    var circles = group.selectAll("circle.main")
        .data([raindrop])
        .join("circle")
        .attr("class", "main")
        .attr("cx", 0)
        .attr("cy", function(d, i){
            return -d*i;
        }) // Adjusted y-coordinate to keep within group
        .attr("r", function(d){
            return r*2;
        })
        .attr("fill", "beige")
        .attr("stroke", Choose_color(i))
        .attr("stroke-width", 3);
              
        
    var numDots = raindrop;
    var dots = group.selectAll(".dot" + i)
            .data(d3.range(numDots))  // Create an array of length 'd'
            .join("circle")
            .attr("class", "dot" + i)
            .attr("cx", function(_, j) {
                // Random position within the circle
                var angle = j * 0.5;  // Adjust this factor for tighter/looser spiral
                var radius = Math.sqrt(j) * r / Math.sqrt(numDots);
                return radius * Math.cos(angle);
            })
            .attr("cy", function(_, j) {
                // Random position within the circle
                var angle = j * 0.5;  // Adjust this factor for tighter/looser spiral
                var radius = Math.sqrt(j) * r / Math.sqrt(numDots);
                return -i + radius * Math.sin(angle);
            })
            .attr("r", 2)  // Set radius for small dots
            .attr("fill", "black");
        });
}
Transform_arr(s10_sorted, 50, 50); 
Transform_arr(s20_sorted,180,50);
Transform_arr(s30_sorted,310,50);
Transform_arr(s40_sorted,450,50);
Transform_arr(s50_sorted,580,50);
Transform_arr(s60_sorted,710,50);



                    // var labels = canvas.selectAll("text")
// .data(s10_sorted)
// .join("text")
// .attr("x", function(d, i){
//     return margin + i * gridWidth;
// })
// .attr("y", function(d){
//     return h - margin - d;
// })
// .attr("dy", -10) // Adjust this value to position the text above the circles
// .attr("text-anchor", "middle")
// .attr("fill", "black") // Set text color
// .text(function(d, i) {
//    return s10_sorted[i]
     
// });






// Draw circles representing the data points


