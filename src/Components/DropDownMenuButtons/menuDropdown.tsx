import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';

import React from 'react';

type MenuDropDownProps = {
    mainRootStyles?: any;
    anchorAlignMent?: any;
    toggleIcon: any;
    children: any;
    transformAlignMent?: any;
    listStyles?: any;
}

const MenuDropDown = ({
    anchorAlignMent = {
        vertical: 'bottom',
        horizontal: 'left',
    },
    children,
    toggleIcon,
    transformAlignMent = {
        vertical: 'top',
        horizontal: 'left',
    },
    listStyles = {
        padding: "20px"
    },
    mainRootStyles = {
        borderRadius: 6,
        minWidth: 180,
        width: "400px",
        color: 'white',
        backgroundColor: "#292b30",
        border: "1px solid #58595a",
    }
}: MenuDropDownProps) => {

    const StyledMenu = styled((props: MenuProps) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                ...anchorAlignMent
            }}
            transformOrigin={{
                ...transformAlignMent
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            minWidth: 180,
            width: "460px",
            color: 'white',
            backgroundColor: "#292b30",
            border: "1px solid #58595a",
            marginTop: theme.spacing(2),
            ...mainRootStyles,
            '& .MuiMenu-list': {
                ...listStyles
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
            ...theme.applyStyles('dark', {
                color: theme.palette.grey[300],
            }),
        },
    }));

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <button onClick={handleClick}>
                {toggleIcon}
            </button>
            {
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    {children}
                </StyledMenu>
            }
        </div>
    )
}

export default MenuDropDown