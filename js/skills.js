forceLayoutVisualize("/js/mySkills.csv");

function forceLayoutVisualize(csvFileValue) {
    // get the data
    d3.csv(csvFileValue, function (error, links) {

        // contain data for nodes
        var nodes = {};

        // Compute the distinct nodes from the links.
        links.forEach(function (link) {
            link.source = nodes[link.source] ||
                (nodes[link.source] = { name: link.source, isRoot: true });

            //console.log("this link source aka root: "+ JSON.stringify(link.source));
            // if link.source does not equal any of the nodes values, then
            // create a new element in the nodes object with the name of the link.source
            // value being considered AKA Root element
            link.target = nodes[link.target] ||
                (nodes[link.target] = { name: link.target });
            link.value = +link.value;
        });

        // set svg area
        var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            height = 1200;

        // use d3 force function
        var force = d3.layout.force()
            .nodes(d3.values(nodes))    // sets layout to array of nodes
            .links(links)               // sets links
            .size([width, height])      // sets using svg area vars
            .linkDistance(50)           // sets target distance between nodes
            .charge(-450)               // sets the force between nodes
            .on("tick", tick)           // runs the animation of the force layour
            .start();                   // starts the simulation

        // for varying link opacity
        var v = d3.scale.linear().range([0, 100]);

        v.domain([0, d3.max(links, function (d) { return d.value; })]);

        links.forEach(function (link) {
            if (v(link.value) <= 25) {
                link.type = "twofive";
            } else if (v(link.value) <= 50 && v(link.value) > 25) {
                link.type = "fivezero";
            } else if (v(link.value) <= 75 && v(link.value) > 50) {
                link.type = "sevenfive";
            } else if (v(link.value) <= 100 && v(link.value) > 75) {
                link.type = "onezerozero"
            }
        });

        // set up the svg container
        var svg = d3.select("#skills").append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("margin-top", "150px");

        // build the arrow.
        svg.append("svg:defs").selectAll("marker")
            .data(["end"])      // Different link/path types can be defined here
            .enter().append("svg:marker")    // This section adds in the arrows
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", -1.5)
            .attr("markerWidth", 6)         // set bounding box for the marker
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");

        // add the links and the arrows
        var path = svg.append("svg:g").selectAll("path")
            .data(force.links())
            .enter().append("svg:path")
            .attr("class", function (d) {
                //  console.log('link: '+ d.source.name + ' isRoot: '+d.source.isRoot + ' d.type: '+ d.type);

                return "link " + d.type;
            })
            .attr("marker-end", "url(#end)");

        // define the nodes
        var node = svg.selectAll(".node")
            .data(force.nodes())
            .enter().append("g")
            .attr("class", "node")
            .on("click", click)             // call click function
            .on("dblclick", dblclick)       // call dblclick function
            .call(force.drag);

        // declare colo(u)r range
        color = d3.scale.category20c();

        // add the nodes
        node.append("circle")
            .attr("r", 15)
            .style("fill", function (d) {
                //  console.log('circle: '+d.name +" isRoot: "+d.isRoot);
                return color(d.name);
            });

        // add the text
        node.append("text")
            .attr("x", 15)
            .attr("dy", ".35em")
            .text(function (d) {
                //  console.log('text: '+d.name +" isRoot: "+d.isRoot);
                return d.name;
            });


        //console.log(JSON.stringify(force.nodes.select(node));
        // add the curvy lines
        function tick() {
            path.attr("d", function (d) {
                var dx = d.target.x - d.source.x,
                    dy = d.target.y - d.source.y,
                    dr = Math.sqrt(dx * dx + dy * dy);
                return "M" +
                    d.source.x + "," +
                    d.source.y + "A" +
                    dr + "," + dr + " 0 0,1 " +
                    d.target.x + "," +
                    d.target.y;
            });

            node
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });
        }

        function click() {
            if (d3.event.defaultPrevented) return; // dragged (http://bl.ocks.org/mbostock/a84aeb78fea81e1ad806)
            d3.select(this).select("text").transition()
                .duration(750)
                .attr("x", 22)
                .style("stroke", "lightsteelblue")
                .style("stroke-width", ".5px")
                .style("font", "20px sans-serif");
            d3.select(this).select("circle").transition()
                .duration(750)
                .attr("r", 16)
        }

        function dblclick() {
            d3.select(this).select("circle").transition()
                .duration(750)
                .attr("r", 6)
            d3.select(this).select("text").transition()
                .style("stroke", "none")
                .style("stroke", "none")
                .style("font", "10px sans-serif");
        }

    });
}
