<template>
  <div id="cy"></div>
</template>

<script>
import cytoscape from "cytoscape";

export default {
  mounted() {
    var cy = cytoscape({
      container: document.getElementById("cy"),

      boxSelectionEnabled: false,
      autounselectify: true,

      style: cytoscape
        .stylesheet()
        .selector("node")
        .style({
          content: "data(id)"
        })
        .selector("edge")
        .style({
          "curve-style": "bezier",
          "target-arrow-shape": "triangle",
          width: 10,
          "line-color": "#ddd",
          "target-arrow-color": "#ddd"
        }),
      elements: {
        nodes: [
          { data: { id: "Luffy", grabbable: false } },
          { data: { id: "Zorro" } },
          { data: { id: "Sanji" } }
        ],

        edges: [
          { data: { id: "luffy-zorro", source: "Luffy", target: "Zorro" } },
          { data: { id: "luffy-sanji", source: "Luffy", target: "Sanji" } },
          { data: { id: "zoro-sanji", source: "Zorro", target: "Sanji" } }
        ]
      },
      layout: {
        name: "circle",
        directed: true,
        padding: 100
      }
    });

    cy.zoomingEnabled(false);
    cy.panningEnabled(false);
    cy.nodes().ungrabify();
  }
};
</script>

<style>
#cy {
  width: 100%;
  height: 90vh;
  display: block;
}
</style>
