/** @jsx jsx */
import { jsx } from "@emotion/core";
import { PropsWithoutRef } from "react";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

export type Props = PropsWithoutRef<JSX.IntrinsicElements["div"]> & {
  onMove: (ratio: number) => void;
};

export const Divider = ({ onMove }: Props) => {
  const onMouseDown = () => {
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
  };

  const onMouseMove = (e: MouseEvent) => {
    const ratio = e.clientX / window.innerWidth;
    onMove(ratio < 0 ? 0 : ratio > 1 ? 1 : ratio);
  };

  const onMouseUp = (e: MouseEvent) => {
    onMouseMove(e);
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("mousemove", onMouseMove);
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#263238",
        cursor: "col-resize",
      }}
      onMouseDown={onMouseDown}
    >
      <DragIndicatorIcon css={{ width: 16 }} htmlColor="#ffffff" />
    </div>
  );
};
