var dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
var w = 900;
var h = 600
var marginLeft = 50,
    marginRight = 20,
    marginTop = 10,
    marginBottom = 30;
var height = h - marginTop - marginBottom;
var width = w - marginLeft - marginRight;






d3.json(dataUrl, function(error, data){
    if(error){
        console.error(error);
    } else {
        var timeFirst = data[0].Seconds;
        var mostLate = data[data.length - 1].Seconds - timeFirst;
        
        var yScale = d3.scale.linear()
                             .domain([1,36])
                             .range([0, height]);
        
        var xScale = d3.scale.linear().domain([mostLate, 0]).range([0, width]);
        
        var yAxis = d3.svg.axis().scale(yScale).orient("left");
        
        var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
        
        var svg = d3.select("body").append("svg")
                                   .attr("width", w)
                                   .attr("height", h)
                                   .append("g")
                                   .attr("transform", "translate(" + marginLeft + "," + marginTop +")");
        
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d){return xScale(d.Seconds - timeFirst);})
            .attr("cy", function(d){return yScale(d.Place);})
            .attr("r", 5);
        
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0, 0)")
            .call(yAxis)
    }
});