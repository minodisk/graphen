/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { Viz, Engine, Format, Error } from "./Viz";
import { Controller } from "./Controller";
import { Editor } from "./Editor";
import { Divider } from "./Divider";
import { Viewer } from "./Viewer";

const useDebounce = (fn: () => any, ms: number = 0, deps: Array<any> = []) => {
  useEffect(() => {
    const timeout = setTimeout(fn, ms);
    return () => {
      clearTimeout(timeout);
    };
  }, deps);
};

const viz = new Viz();

const defaultCode = `digraph G {

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
}`;

export const App = () => {
  const params = { engine: "dot", code: defaultCode, ...useParams() };
  const format: Format = "svg";

  const paramCode = decodeURIComponent(params.code);
  const [code, setCode] = useState(paramCode);
  const [svg, setSvg] = useState("");
  const [ratio, setRatio] = useState(0.5);
  const [error, setError] = useState<Error>();

  useDebounce(
    async () => {
      try {
        console.log("Compiling.......");
        if (
          ["circo", "dot", "fdp", "neato", "osage", "twopi"].indexOf(
            params.engine,
          ) === -1
        ) {
          throw {
            row: 0,
            column: 0,
            text: "bad format",
          };
        }
        const s = await viz.render(code, {
          engine: params.engine as Engine,
          format,
        });
        setError(undefined);
        setSvg(s);
      } catch (err) {
        setError(err);
      }
    },
    100,
    [code],
  );

  const percent = Math.round(ratio * 10000) / 100;

  return (
    <Fragment>
      <Global
        styles={{
          body: {
            margin: 0,
          },
          "#app": {
            position: "absolute",
            width: "100%",
            height: "100%",
          },
        }}
      />
      <Controller
        onAdd={async () => {
          await fetch("/api/graphs", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify({}),
          });
        }}
        onSave={() => {}}
      />
      <section
        css={{
          display: "flex",
          height: "calc(100% - 64px)",
        }}
      >
        <Editor
          widthPercent={percent}
          code={code}
          error={error}
          onChange={setCode}
        />
        <Divider onMove={setRatio} />
        <Viewer widthPercent={100 - percent} svg={svg} />
      </section>
    </Fragment>
  );
};
