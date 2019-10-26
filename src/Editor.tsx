/** @jsx jsx */
import { jsx } from "@emotion/core";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-dot";
import "ace-builds/src-noconflict/theme-monokai";
import { Error } from "./Viz";

export type Props = {
  code: string;
  onChange: (code: string) => void;
  error?: Error;
};

export const Editor = ({ code, onChange, error }: Props) => (
  <AceEditor
    mode="dot"
    theme="monokai"
    name="graphen"
    fontSize={14}
    value={code}
    onChange={onChange}
    annotations={
      error
        ? [
            {
              type: "error",
              row: error.row,
              column: error.column,
              text: error.text,
            },
          ]
        : []
    }
  />
);
