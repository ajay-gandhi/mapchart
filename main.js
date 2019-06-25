
const mapOptions = ["us", "world"];
const settings = {
  whichMap: false,
  colorscheme: false,
  data: false,
};

d3.selectAll(".AccordionContent__selectMap").on("click", () => {
  settings.whichMap = d3.event.target.id;
});

d3.selectAll(".AccordionContent__selectColor").on("click", () => {
  settings.colorscheme = d3.event.target.id;
});

d3.select(".AccordionContent__selectFile").on("change", () => {
  const reader = new FileReader();
  const file = d3.event.target.files[0];
  if (!file) return;
  reader.onload = (f) => {
    settings.data = d3.csvParse(f.target.result.trim());
  };
  reader.readAsText(file);
});

d3.select(".AccordionContent__makeMap").on("click", () => {
  if (!validateSettings()) return;

  const colorScale = d3.scaleLinear().domain([0, 1]).range(["white", settings.colorscheme]);

  d3.text(`assets/${settings.whichMap}.svg`)
    .then((svgText) => {
      d3.select(".AccordionContent__mapResult").html(svgText);
      const svg = d3.select(".AccordionContent__mapResult svg");

      for (let i = 0; i < settings.data.length; i++) {
        const state = svg.select(`path#${settings.data[i].country}`);
        state.style("fill", colorScale(settings.data[i].value));
      }
    });
});

const validateSettings = () => {
  const errors = [];
  if (!mapOptions.includes(settings.whichMap)) errors.push("Invalid map type selection");
  if (!settings.colorscheme) errors.push("Invalid color selection");
  if (!settings.data) errors.push("No data");

  if (errors.length === 0) {
    return true;
  } else {
    d3.select(".AccordionContent__mapResult").html(errors.join("<br />"));
    return false;
  }
};
