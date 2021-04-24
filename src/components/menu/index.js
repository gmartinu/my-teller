import React from "react";
import Popper from "@material-ui/core/Popper";
import { ClickAwayListener, Fab, makeStyles, MenuItem, MenuList, Paper, Tooltip, IconButton } from "@material-ui/core";
import { ExpandMore, MoreHoriz, MoreVert, Add } from "@material-ui/icons";
import { Button } from "components";

const useStyles = makeStyles((theme) => ({
    absolute: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}));

export default function SimplePopper({ options, color, label, type, lbExpand, startIcon, disabled, fullWidth }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
        }
    }
    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    return (
        <>
            {type === "lateral" ? (
                <IconButton size="small" disabled={disabled ? true : false} color={color ? color : "twitter"} onClick={handleClick}>
                    <MoreHoriz />
                </IconButton>
            ):type === "vertical" ? (
                <IconButton size="small" disabled={disabled ? true : false} color={color ? color : "twitter"} onClick={handleClick}>
                    <MoreVert />
                </IconButton>
            ) : type === "fab" ? (
                <Tooltip title={label} aria-label={label}>
                    <Fab disabled={disabled ? true : false} onClick={handleClick} color="primary" className={classes.absolute} aria-label={label}>
                        <Add />
                    </Fab>
                </Tooltip>
            ) : (
                // <CustomButton
                //     variant="contained"
                //     onClick={handleClick}
                //     color="warning"
                // >
                //     {label}
                // </CustomButton>

                <Button
                    disabled={disabled ? true : false}
                    startIcon={startIcon ? startIcon : null}
                    color={color ? color : "twitter"}
                    onClick={handleClick}
                    style={fullWidth ? 
                        { marginLeft: 10, width: "100%" } : 
                        { marginLeft: 10}}
                    // endIcon={
                    //     <div style={{
                    //         // position: "relative",
                    //         // right: 0,
                    //         // top: '50%',
                    //         // transform: "translateY(-50%)"
                    //     }}>
                    //         <ExpandMore />
                    //     </div>
                    // }
                >
                    {label}{" "}
                    {lbExpand ? null : (
                        <>
                            {" "}
                            &nbsp;|
                            <ExpandMore />{" "}
                        </>
                    )}
                </Button>
            )}
            <Popper id={id} open={open} anchorEl={anchorEl} style={{ zIndex: 9999999 }}>
                <Paper>
                    <ClickAwayListener onClickAway={handleClick}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            {options ? (
                                options.map((item, idx) => {
                                    const Icon = item.Icon;
                                    return (
                                        <MenuItem
                                            disabled={item.disabled ? true : false}
                                            key={idx}
                                            onClick={
                                                item.function
                                                    ? (e) => {
                                                          item.function(e);
                                                          handleClick(e);
                                                      }
                                                    : handleClick
                                            }
                                        >
                                            {item.Icon ? <Icon style={{ marginRight: 8 }} /> : null}
                                            {item.label}
                                        </MenuItem>
                                    );
                                })
                            ) : (
                                <MenuItem onClick={handleClick}>Sem Opções</MenuItem>
                            )}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </>
    );
}
