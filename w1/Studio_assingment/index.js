var w = 700;
var h = 600;
var r = 5;
var Yspacing = 30;
var Xspacing = 50;
var PlanesH = 10;
var spacing = 10;

var canvas = d3.select("#canvas")
       .append("svg")
       .attr("width",w)
       .attr("height",h)
       .style("background-color","black");


var Birds =  [{
     time: 0.20,
    ammount: 1, 
    loudness: 0}, 

{ time : 0.35,
    ammount: 2, 
    loudness: 1 
},

{ time : 1.30,
    ammount: 1, 
    loudness: 1 
},

{ time : 2.27,
    ammount: 1, 
    loudness: 0 
}, 

{ time : 3.11,
    ammount: 2, 
    loudness: 3
}, 

{ time : 4.40,
    ammount: 3, 
    loudness: 4 
}, 

{ time : 5.09,
    ammount: 1, 
    loudness: 0 
}, 

{ time : 6.50,
    ammount: 3, 
    loudness: 3
}, 

{ time : 7.23,
    ammount: 2, 
    loudness: 1 
}, 

{ time : 9.48,
    ammount: 1, 
    loudness: 0 
}

] 

var Planes = [{
    time : 1.17,
    ammount: 1, 
    loudness: 6
}, 

{ time : 6.17,
ammount: 1, 
loudness: 7
}
]

var xScale = d3.scaleLinear()
.domain([0, 10])
.range([50, w - 50]); 

var yScale = d3.scaleLinear()
.domain([0, 10])
.range([h - 50, 50]); 


var xAxis = d3.axisBottom(xScale)
.ticks(10)
.tickFormat(d => d.toFixed(2)); 
var yAxis = d3.axisLeft(yScale)
.ticks(10)


canvas.append("g")
.attr("transform", `translate(0, ${h - 50})`)
.call(xAxis)
.attr("color", "white");

canvas.append("text")
            .attr("transform", `translate(${w / 2}, ${h - 10})`)
            .style("text-anchor", "middle")
            .style("fill", "white")
            .text("Minutes"); 


canvas.append("g")
.attr("transform", "translate(50, 0)")
.call(yAxis)
.attr("color", "white");

canvas.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -h / 2)
            .attr("y", 15)
            .style("text-anchor", "middle")
            .style("fill", "white")
            .text("Loudness");

var BirdsCircles = canvas.selectAll("circle")
					.data(Birds)
					.join("circle")
					.attr("cx",  function(d) {
                        return xScale(d.time);

                    })
					.attr("cy",  function(d){
                        return yScale(d.loudness);
                    })
					.attr("r", function(d){
						return d.ammount*r} ) 
					.attr("fill","white")
					.attr("stroke","white")
					.attr("stroke-width",.5)


var PlanesRect = canvas.selectAll("rect")
                    .data(Planes)
                    .join("rect")
                    .attr("x", function(d){
                        return xScale(d.time);
                    })
					.attr("y", function(d){
						return yScale(d.loudness);
					})
					.attr("width", function(d){
						return d.ammount*PlanesH;
						
					})
					.attr("height", function(d){
						return d.ammount*PlanesH})
                        .attr("fill","yellow")
                        .attr("stroke","yellow")
                        .attr("stroke-width",.5)



var legendData = [
        { label: "Birds", shape: "circle",color: "white" },
        { label: "Planes",shape: "rect", color: "yellow" }
        ];
        
var legend = canvas.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(600, 20)"); 


var legendItems = legend.selectAll("g")
    .data(legendData)
    .enter()
    .append("g")
    .attr("transform", function(d, i) {
        return "translate(0, " + (i * 20) + ")";
    });

legendItems.each(function(d) {
    if (d.shape === "circle") {
        d3.select(this).append("circle")
            .attr("cx", 5)
            .attr("cy", 5)
            .attr("r", 5)
            .attr("fill", d.color);
    } else if (d.shape === "rect") {
        d3.select(this).append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", d.color);
    }
});
legendItems.append("text")
    .attr("x", 20)
    .attr("y", 10)
    .attr("fill", "white")
    .text(d => d.label);

canvas.append("text")
.attr("x", w / 2)
.attr("y", 20) 
.attr("text-anchor", "middle")
.attr("fill", "white")
.style("font-size",  "17px")
.style("font-style", "italic")
.text("Size of the shapes grow according to number of objects spotted"); 
