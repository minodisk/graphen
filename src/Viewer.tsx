/** @jsx jsx */
import { jsx } from "@emotion/core";
import { PropsWithoutRef } from "react";

export type Props = PropsWithoutRef<JSX.IntrinsicElements["div"]> & {
  svg: string;
};

export const Viewer = ({ svg }: Props) => {
  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
};
