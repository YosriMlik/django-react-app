'use client'

import { useEffect, useState } from "react";
import Navbar from "../components/navbar";

let n = 0;

function Documentation() {
  let x = 0;
  console.log('re-render', n);

  const [count, setCount] = useState(0);
  const [yosri, setYosri] = useState(0);

  useEffect(() => {
    console.log('yosri', yosri);
  }, [yosri]); // Correct dependency array

  function increment() {
    x += 1;
    setCount(count + 1);
    if (count >= 2) {
      setYosri(count + 1);
      n += 3;
    }
  }

  return (
    <>
      <Navbar />
      <main className="container mt-5">
        <table border={1} className='table is-stripped is-bordered is-narrow'>
          <tbody>
            <tr>
              <td>useEffect</td>
              <td></td>
              <td>
                It runs on: <br />
                <p>* Beginning of first render</p> or <br />
                <p>* Beginning of every re-render</p> or <br />
                <p>* Beginning of every re-render <b>AND</b> changing into a specified variable in the array</p>
              </td>
            </tr>
            <tr>
              <td><p>useState: </p></td>
              <td><b>{count}</b></td>
              <td>
                (component re-render when &#39;count&#39; value changes using &#39;setCount&#39;, and it does not go back to initialised value until you refresh) <br /> <br />
                1. Persistence Across Renders:
                The state value persists across multiple renders of the component. When you update the state using the setter function (e.g., setCount), React preserves this state value between renders.
                <br /> <br />
                2. Triggering Re-renders:
                Updating the state using the setter function (setCount) causes the component to re-render. This ensures that the component&#39;s UI reflects the latest state.
                <br /> <br />
                3. Isolation to Component:
                Each instance of a component has its own state. If the same component is rendered multiple times, each will have its own independent state.
                <br /> <br />
                4. Initial Value:
                useState: The initial value is set when the component first renders. Subsequent renders will use the updated state value instead of reinitializing to the initial value.
              </td>
            </tr>
            <tr>
              <td><p>Normal variable inside component: </p></td>
              <td> <b>{x}</b> </td>
              <td>(every re-render it is initialized to 0 !!)</td>
            </tr>
            <tr>
              <td><p>Normal variable outside component: </p></td>
              <td> <b>{n}</b> </td>
              <td>
                1. Shared Across Component Instances:
                The variable is shared across all instances of the component. It is not tied to any specific instance of the component, and any update to this variable affects all instances.
                <br /> <br />
                2. No Re-render Trigger:
                Updating this variable does not trigger a re-render of the component. This means that changes to the variable will not automatically cause the component to update its UI.
                <br /> <br />
                3. Persistence:
                The variable retains its value between renders because it is not tied to the component&#39;s lifecycle. However, this also means that it does not reset or change in response to individual component re-renders in a controlled manner.
                <br /> <br />
                4. Global State Behavior:
                This behaves more like a global state, which is accessible and modifiable by any part of the application that has access to it. This can lead to unexpected behaviors if not managed carefully.
              </td>
            </tr>
          </tbody>
        </table>

        <button onClick={increment} className="button is-link">Increment all</button>
        <br />
        <br />
        <br />
        <br />
      </main>
    </>
  )
}

export default Documentation;
