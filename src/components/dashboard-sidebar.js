import {useEffect, useState} from 'react';
import {matchPath, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Box, Divider, Drawer, IconButton, List} from '@material-ui/core';
import {DashboardSidebarItem} from './dashboard-sidebar-item';
import {Scrollbar} from './scrollbar';
import {ChevronLeft as ChevronLeftIcon} from '../icons/chevron-left';
import {ChevronRight as ChevronRightIcon} from '../icons/chevron-right';
import {Cog as CogIcon} from '../icons/cog';
import {CustomCube as CubeIcon} from '../icons/custom-cube';
import {CustomShoppingCart as ShoppingCartIcon} from '../icons/custom-shopping-cart';
import {CustomUsers as UsersIcon} from '../icons/custom-users';

const items = [
    {
        icon: CubeIcon,
        title: 'Orders',
        items: [
            {
                href: '/dashboard/orders',
                title: 'List'
            },
            {
                href: '/dashboard/orders/:id',
                title: 'Summary'
            },
            {
                href: '/dashboard/orders/create',
                title: 'Create'
            }
        ]
    },
    {
        icon: UsersIcon,
        title: 'Customers',
        items: [
            {
                href: '/dashboard/customers',
                title: 'List'
            },
            {
                href: '/dashboard/customers/:id',
                title: 'Summary'
            },
            {
                href: '/dashboard/customers/:id/orders',
                title: 'Orders'
            }
        ]
    },
    {
        icon: ShoppingCartIcon,
        title: 'Products',
        items: [
            {
                href: '/dashboard/products',
                title: 'List'
            },
            {
                href: '/dashboard/products/:id',
                title: 'Summary'
            }
        ]
    },
    {
        icon: CogIcon,
        title: 'Account',
        items: [
            {
                href: '/dashboard/account',
                title: 'General Settings'
            }
        ]
    }
];

export const DashboardSidebar = (props) => {
    const {onPin, pinned} = props;
    const {pathname} = useLocation();
    const [openedItem, setOpenedItem] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    const [activeHref, setActiveHref] = useState('');
    const [hovered, setHovered] = useState(false);

    const handleOpenItem = (item) => {
        if (openedItem === item) {
            setOpenedItem(null);
            return;
        }

        setOpenedItem(item);
    };

    useEffect(() => {
        items.forEach((item) => {
            if (item.items) {
                for (let index = 0; index < item.items.length; index++) {
                    const active = matchPath({path: item.items[index].href}, pathname);

                    if (active) {
                        setActiveItem(item);
                        setActiveHref(item.items[index].href);
                        setOpenedItem(item);
                        break;
                    }
                }
            } else {
                const active = !!matchPath({path: item.href, end: true}, pathname);

                if (active) {
                    setActiveItem(item);
                    setOpenedItem(item);
                }
            }
        });
    }, [pathname]);

    return (
        <Drawer
            open
            sx={{zIndex: 1000}}
            variant="permanent"
            PaperProps={{
                onMouseOver: () => {
                    setHovered(true);
                },
                onMouseLeave: () => {
                    setHovered(false);
                },
                sx: {
                    backgroundColor: 'background.paper',
                    height: 'calc(100% - 64px)',
                    overflowX: 'hidden',
                    top: 64,
                    transition: 'width 250ms ease-in-out',
                    width: pinned ? 270 : 73,
                    '& .simplebar-content': {
                        height: '100%'
                    },
                    '&:hover': {
                        width: 270,
                        '& span, p': {
                            display: 'flex'
                        }
                    }
                }
            }}
        >
            <Scrollbar
                style={{
                    display: 'flex',
                    flex: 1,
                    overflowX: 'hidden',
                    overflowY: 'auto'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        p: 2
                    }}
                >
                    <List disablePadding>
                        {activeItem && (items.map((item) => (
                            <DashboardSidebarItem
                                active={activeItem?.title === item.title}
                                activeHref={activeHref}
                                key={item.title}
                                onOpen={() => handleOpenItem(item)}
                                open={openedItem?.title === item.title && (hovered || pinned)}
                                pinned={pinned}
                                {...item}
                            />
                        )))}
                    </List>
                    <Box sx={{flexGrow: 1}}/>
                    <Divider/>
                    <Box sx={{pt: 1}}>
                        <IconButton onClick={onPin}>
                            {pinned ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </Box>
                </Box>
            </Scrollbar>
        </Drawer>
    );
};

DashboardSidebar.propTypes = {
    onPin: PropTypes.func,
    pinned: PropTypes.bool
};
