d3.selectAll(".AccordionSection__heading").on("click", () => {
  d3.selectAll(".AccordionSection").classed("AccordionSection--minimized", true);
  d3.select(d3.event.target.parentNode).classed("AccordionSection--minimized", false);
});
