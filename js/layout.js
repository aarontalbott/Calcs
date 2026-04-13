function createPanel(panelConfig) {
  const panel = document.createElement("div");
  panel.className = "panel";

  const header = document.createElement("div");
  header.className = "panel-header";
  header.textContent = panelConfig.title;

  const content = document.createElement("div");
  content.className = "panel-content";

  panel.appendChild(header);
  panel.appendChild(content);

  if (panelConfig.render) {
    panelConfig.render(content);
  }

  return panel;
}

function createColumn(panels) {
  const col = document.createElement("div");
  col.className = "column";

  panels.forEach(p => col.appendChild(createPanel(p)));

  return col;
}

function createCenter(topPanels, bottomPanels) {
  const center = document.createElement("div");
  center.className = "column center";

  const top = document.createElement("div");
  top.className = "center-top";

  const bottom = document.createElement("div");
  bottom.className = "center-bottom";

  topPanels.forEach(p => top.appendChild(createPanel(p)));
  bottomPanels.forEach(p => bottom.appendChild(createPanel(p)));

  center.appendChild(top);
  center.appendChild(bottom);

  return center;
}

function createLayout(config) {
  const app = document.getElementById("app");

  const header = document.createElement("div");
  header.className = "header";
  header.textContent = config.header?.title || "";

  const main = document.createElement("div");
  main.className = "main";

  const left = createColumn(config.left || []);
  const center = createCenter(config.centerTop || [], config.centerBottom || []);
  const right = createColumn(config.right || []);

  main.appendChild(left);
  main.appendChild(center);
  main.appendChild(right);

  const footer = document.createElement("div");
  footer.className = "footer";
  footer.textContent = config.footer?.text || "";

  app.appendChild(header);
  app.appendChild(main);
  app.appendChild(footer);
}