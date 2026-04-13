function createState(initial = {}) {
  const listeners = [];

  const state = new Proxy(initial, {
    set(target, key, value) {
      target[key] = value;
      listeners.forEach(fn => fn());
      return true;
    }
  });

  function subscribe(fn) {
    listeners.push(fn);
  }

  return { state, subscribe };
}

function bindInput(id, stateObj, key) {
  const el = document.getElementById(id);
  el.addEventListener("input", () => {
    stateObj[key] = parseFloat(el.value) || 0;
  });
}

function bindText(id, computeFn, subscribe) {
  const el = document.getElementById(id);

  function update() {
    el.innerText = computeFn();
  }

  subscribe(update);
  update();
}

/* MathJax binding */
function bindMath(id, computeFn, subscribe) {
  const el = document.getElementById(id);

  function update() {
    el.innerHTML = computeFn();

    if (window.MathJax) {
      MathJax.typesetPromise([el]);
    }
  }

  subscribe(update);
  update();
}

function compute(fn, subscribe) {
  subscribe(fn);
  fn();
}