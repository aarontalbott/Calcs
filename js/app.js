const { state, subscribe } = createState({
  length: 0,
  load: 0,
  moment: 0
});

createLayout({
  header: {
    title: "Beam Calculation Tool"
  },

  left: [
    {
      title: "Inputs",
      render: (el) => {
        el.innerHTML = `
          <label>Length (ft)</label>
          <input type="number" id="length"/>

          <label>Load (k/ft)</label>
          <input type="number" id="load"/>
        `;

        bindInput("length", state, "length");
        bindInput("load", state, "load");
      }
    }
  ],

  centerTop: [
    {
      title: "Results",
      render: (el) => {
        el.innerHTML = `
          <div class="result-highlight">
            \\( M_{max} = <span id="moment"></span> \\ \\text{kip-ft} \\)
          </div>
        `;

        bindText("moment", () => state.moment.toFixed(2), subscribe);
      }
    }
  ],

  centerBottom: [
    {
      title: "Calculation Output",
      render: (el) => {
        el.innerHTML = `
          <div id="math-output" class="math-block"></div>
        `;

        bindMath("math-output", () => {
          return `
\\[
M = \\frac{wL^2}{8}
\\]

\\[
M = \\frac{${state.load} \\cdot ${state.length}^2}{8}
\\]

\\[
M = ${state.moment.toFixed(2)} \\ \\text{kip-ft}
\\]
          `;
        }, subscribe);
      }
    }
  ],

  right: [
    {
      title: "Status",
      render: (el) => {
        el.innerHTML = `<div id="status"></div>`;

        bindText("status", () => {
          if (state.length <= 0) return "Enter length";
          if (state.load <= 0) return "Enter load";
          return "Ready";
        }, subscribe);
      }
    }
  ],

  footer: {
    text: "© 2026 Engineering Tool"
  }
});

/* Calculation */
compute(() => {
  state.moment = (state.load * state.length ** 2) / 8;
}, subscribe);