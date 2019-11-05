/** @jsx jsx */
import { jsx } from "@emotion/core";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-dot";
import "ace-builds/src-noconflict/theme-monokai";
import { Error } from "./Viz";

export type Props = {
  widthPercent: number;
  code: string;
  onChange: (code: string) => void;
  error?: Error;
};

export const Editor = ({
  widthPercent,
  code,
  onChange,
  error,
  ...props
}: Props) => (
  <AceEditor
    width={`calc(${widthPercent}% - 8px)`}
    height="100%"
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
    {...props}
  />
);
