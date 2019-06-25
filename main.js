
const mapOptions = ["us", "world"];
const settings = {
  whichMap: "us",
  // whichMap: false,
  colorscheme: false,
  data: false,
};

d3.selectAll(".selectMap").on("click", () => {
  settings.whichMap = d3.event.target;
});

d3.selectAll(".selectColor", () => {
  settings.colorscheme = d3.event.target;
});

d3.select(".selectFile").on("change", () => {
  const reader = new FileReader();
  const file = d3.event.target.files[0];
  if (!file) return;
  reader.onload = (f) => {
    settings.data = d3.csvParse(f.target.result.trim());
  };
  reader.readAsText(file);
});

d3.select(".makeMap").on("click", () => {
  if (!mapOptions.includes(settings.whichMap)) return console.log("Invalid map option");

  const colorScale = d3.scaleLinear().domain([0, 1]).range(["white", "green"]);

  d3.text(`assets/${settings.whichMap}.svg`)
    .then((svgText) => {
      d3.select(".mapResult").html(svgText);
      const svg = d3.select(".mapResult svg");

      for (let i = 0; i < settings.data.length; i++) {
        const state = svg.select(`path#${settings.data[i].country}`);
        state.style("fill", colorScale(settings.data[i].value));
      }
    });
});
