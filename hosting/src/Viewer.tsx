/** @jsx jsx */
import { jsx } from "@emotion/core";
import { PropsWithoutRef } from "react";

export type Props = PropsWithoutRef<JSX.IntrinsicElements["div"]> & {
  widthPercent: number;
  svg: string;
};

export const Viewer = ({ widthPercent, svg }: Props) => {
  return (
    <div
      css={{
        width: `calc(${widthPercent}% - 8px)`,
        height: "100%",
        overflow: "scroll",
        position: "relative",
        zIndex: 1,
        svg: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        },
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
