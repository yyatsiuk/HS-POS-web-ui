import {useEffect, useState} from 'react';
import {matchPath, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Drawer, List} from '@material-ui/core';
import {DashboardNavbarMenuItem} from './dashboard-navbar-menu-item';
import {Cog as CogIcon} from '../icons/cog';
import {CustomCube as CubeIcon} from '../icons/custom-cube';
import {CustomShoppingCart as ShoppingCartIcon} from '../icons/custom-shopping-cart';
import {CustomUsers as UsersIcon} from '../icons/custom-users';
import {DocumentText as DocumentTextIcon} from '../icons/document-text';

const items = [
    {
        icon: UsersIcon,
        title: 'Customers',
        items: [
            {
                href: '/dashboard/customers',
                title: 'List'
            },
            {
                href: '/dashboard/customers/1',
                title: 'Summary'
            },
            {
                href: '/dashboard/customers/1/orders',
                title: 'Orders'
            }
        ]
    },
    {
        icon: CubeIcon,
        title: 'Orders',
        items: [
            {
                href: '/dashboard/orders',
                title: 'List'
            },
            {
                href: '/dashboard/orders/1',
                title: 'Summary'
            },
            {
                href: '/dashboard/orders/create',
                title: 'Create'
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
                href: '/dashboard/products/1',
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
            },
        ]
    }
];

export const DashboardNavbarMenu = (props) => {
    const {open, onClose} = props;
    const {pathname} = useLocation();
    const [openedItem, setOpenedItem] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    const [activeHref, setActiveHref] = useState('');

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
                    const active = matchPath({path: item.items[index].href, end: true}, pathname);

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
            anchor="top"
            onClose={onClose}
            open={open}
            transitionDuration={0}
            ModalProps={{
                BackdropProps: {
                    invisible: true
                }
            }}
            PaperProps={{
                sx: {
                    backgroundColor: '#2B2F3C',
                    color: '#B2B7C8',
                    display: 'flex',
                    flexDirection: 'column',
                    top: 64,
                    maxHeight: 'calc(100% - 64px)',
                    width: '100vw'
                }
            }}
        >
            <List>
                {activeItem && (items.map((item) => (
                    <DashboardNavbarMenuItem
                        active={activeItem?.title === item.title}
                        activeHref={activeHref}
                        key={item.title}
                        onClose={onClose}
                        onOpenItem={() => handleOpenItem(item)}
                        open={openedItem?.title === item.title}
                        {...item}
                    />
                )))}
            </List>
        </Drawer>
    );
};

DashboardNavbarMenu.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func
};
