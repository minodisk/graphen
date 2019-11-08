/** @jsx jsx */
import { jsx } from "@emotion/core";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddOutlined";
import ShareIcon from "@material-ui/icons/ShareOutlined";
import CodeIcon from "@material-ui/icons/Code";
import SaveIcon from "@material-ui/icons/SaveAltOutlined";
import { Authentication } from "./Authentication";

export type Props = {
  onAdd: () => void;
  onSave: () => void;
};

export const Controller = ({ onAdd, onSave }: Props) => (
  <AppBar position="relative">
    <Toolbar
      css={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6">Graphen</Typography>
      <div>
        <IconButton color="inherit" onClick={onAdd}>
          <AddIcon />
        </IconButton>
        <IconButton color="inherit" onClick={onSave}>
          <SaveIcon />
        </IconButton>
        <IconButton color="inherit">
          <CodeIcon />
        </IconButton>
        <IconButton color="inherit">
          <ShareIcon />
        </IconButton>
        <Authentication />
      </div>
    </Toolbar>
  </AppBar>
);
