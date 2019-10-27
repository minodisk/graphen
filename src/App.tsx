/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { Viz, Engine, Format, Error } from "./Viz";
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
  const params = { engine: "dot", code: "foo", ...useParams() };
  const format: Format = "svg";

  const paramCode = decodeURIComponent(params.code);
  const [code, setCode] = useState(paramCode);
  const [svg, setSvg] = useState("");
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
      <Controller />
      <section
        css={{
          display: "flex",
          height: "100%",
        }}
      >
        <Editor
          code={code}
          error={error}
          onChange={code => {
            setCode(code);
            // history.pushState(
            //   null,
            //   "",
            //   `/engines/${"dot"}/codes/${encodeURIComponent(code)}`,
            // );
          }}
        />
        <Viewer svg={svg} />
      </section>
    </Fragment>
  );
};
