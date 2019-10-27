/** @jsx jsx */
import { jsx } from "@emotion/core";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddOutlined";
import CopyIcon from "@material-ui/icons/FileCopy";
import ShareIcon from "@material-ui/icons/ShareOutlined";
import SaveIcon from "@material-ui/icons/SaveAltOutlined";
import AccountIcon from "@material-ui/icons/AccountCircle";

export type Props = {};

export const Controller = ({  }: Props) => {
  return (
    <AppBar position="static">
      <Toolbar
        css={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Graphen</Typography>
        <div>
          <IconButton color="inherit">
            <AddIcon />
          </IconButton>
          <IconButton color="inherit">
            <CopyIcon />
          </IconButton>
          <IconButton color="inherit">
            <ShareIcon />
          </IconButton>
          <IconButton color="inherit">
            <SaveIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};
