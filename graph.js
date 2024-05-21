const MARGIN = { top: 80, right: 60, bottom: 50, left: 100 };

const HEIGHT = 500 + MARGIN.right - MARGIN.left;
const WIDTH = 600 + MARGIN.top - MARGIN.bottom;

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("height", HEIGHT + MARGIN.right + MARGIN.left)
  .attr("width", WIDTH + MARGIN.top + MARGIN.bottom)
  .append("g")
  .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top})`);

const x = d3.scaleLinear().range([0, WIDTH]);
const xAxis = svg.append("g").attr("transform", `translate(0, ${HEIGHT})`);

const y = d3.scaleLinear().range([HEIGHT, 0]);
const yAxis = svg.append("g");

const size = d3.scaleLinear().range([1, 40]).domain([20000, 1310000000]);

d3.csv("data.csv").then((data) => {
  // Setting Domains
  x.domain([0, 10000]);
  y.domain([35, 90]);

  // Color Scale
  const colorScale = d3
    .scaleOrdinal(d3["schemeSet3"])
    .domain(data.map((d) => d.continent));

  svg
    .selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", (d) => x(d.gdpPercap))
    .attr("cy", (d) => y(d.lifeExp))
    .attr("r", (d) => size(d.pop))
    .attr("stroke", "#18181b")
    .attr("stroke-width", 0.5)
    .style("fill", (d) => colorScale(d.continent));

  xAxis.call(d3.axisBottom(x));
  yAxis.call(d3.axisLeft(y));
});
