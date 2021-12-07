import { createSignal, onCleanup } from "solid-js";
import { render } from "solid-js/web";
import Heading from "./title";

const App = () => {
  const [count, setCount] = createSignal(0),
    timer = setInterval(() => setCount(count() + 1), 1000);
  onCleanup(() => clearInterval(timer));

  return (
    <div className="main">
      <Heading />
      Hello {count()}
    </div>
  );
};

render(() => <App />, document.getElementById("app"));
