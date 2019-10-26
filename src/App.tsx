/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import { useState, useEffect, Fragment } from "react";
import { Viz, Error } from "./Viz";
import { Editor } from "./Editor";
import { Viewer } from "./Viewer";
import { Controller } from "./Controller";

const useDebounce = (fn: () => any, ms: number = 0, deps: Array<any> = []) => {
  useEffect(() => {
    const timeout = setTimeout(fn, ms);
    return () => {
      clearTimeout(timeout);
    };
  }, deps);
};

const viz = new Viz();

export const App = () => {
  const [code, setCode] = useState(`digraph G {

	subgraph cluster_0 {
		style=filled;
		color=lightgrey;
		node [style=filled,color=white];
		a0 -> a1 -> a2 -> a3;
		label = "process #1";
	}

	subgraph cluster_1 {
		node [style=filled];
		b0 -> b1 -> b2 -> b3;
		label = "process #2";
		color=blue
	}
	start -> a0;
	start -> b0;
	a1 -> b3;
	b2 -> a3;
	a3 -> a0;
	a3 -> end;
	b3 -> end;

	start [shape=Mdiamond];
	end [shape=Msquare];
}`);
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<Error>();

  useDebounce(
    async () => {
      try {
        const s = await viz.render(code);
        setError(undefined);
        setSvg(s);
      } catch (err) {
        setError(err);
      }
    },
    100,
    [code],
  );

  return (
    <Fragment>
      <Global
        styles={{
          body: {
            margin: 0,
          },
        }}
      />
      <Controller />
      <section
        css={{
          display: "flex",
        }}
      >
        <Editor code={code} error={error} onChange={setCode} />
        <Viewer svg={svg} />
      </section>
    </Fragment>
  );
};
