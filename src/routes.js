import {lazy, Suspense} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthGuard} from './components/auth-guard';
import {GuestGuard} from './components/guest-guard';
import {Customer} from './pages/customer';
import {LoadingScreen} from './components/loading-screen';
import {Account} from './pages/account';
import {DashboardLayout} from './pages/dashboard-layout';
import {Product} from './pages/product';

const Loadable = (Component) => (props) => (
    <Suspense fallback={<LoadingScreen/>}>
        <Component {...props} />
    </Suspense>
);

// Not found pages
const NotFound = Loadable(lazy(() => import('./pages/not-found').then((module) => ({default: module.NotFound}))));

// Auth pages
const Login = Loadable(lazy(() => import('./pages/login').then((module) => ({default: module.Login}))));
const Register = Loadable(lazy(() => import('./pages/register').then((module) => ({default: module.Register}))));
const VerifyCode = Loadable(lazy(() => import('./pages/verify-code').then((module) => ({default: module.VerifyCode}))));

// Dashboard pages
const Customers = Loadable(lazy(() => import('./pages/customers').then((module) => ({default: module.Customers}))));
const CustomerOrders = Loadable(lazy(() => import('./pages/customer-orders').then((module) => ({default: module.CustomerOrders}))));
const CustomerSummary = Loadable(lazy(() => import('./pages/customer-summary').then((module) => ({default: module.CustomerSummary}))));

const Order = Loadable(lazy(() => import('./pages/order').then((module) => ({default: module.Order}))));
const Orders = Loadable(lazy(() => import('./pages/orders').then((module) => ({default: module.Orders}))));
const OrderCreate = Loadable(lazy(() => import('./pages/order-create').then((module) => ({default: module.OrderCreate}))));

const Products = Loadable(lazy(() => import('./pages/products').then((module) => ({default: module.Products}))));
const ProductAnalytics = Loadable(lazy(() => import('./pages/product-analytics').then((module) => ({default: module.ProductAnalytics}))));
const ProductInventory = Loadable(lazy(() => import('./pages/product-inventory').then((module) => ({default: module.ProductInventory}))));
const ProductSummary = Loadable(lazy(() => import('./pages/product-summary').then((module) => ({default: module.ProductSummary}))));

const AccountGeneral = Loadable(lazy(() => import('./pages/account-general').then((module) => ({default: module.AccountGeneral}))));

const routes = [
    {
        path: '/',
        element: (
            <Navigate
                to="/login"
                replace
            />
        )
    },
    {
        path: 'dashboard',
        element: (
            <AuthGuard>
                <DashboardLayout/>
            </AuthGuard>
        ),
        children: [
            {
                path: '/dashboard',
                element: (
                    <Navigate
                        to="/dashboard/orders"
                        replace
                    />
                )
            },
            {
                path: 'account',
                element: <Account/>,
                children: [
                    {
                        path: '',
                        element: <AccountGeneral/>
                    },
                ]
            },
            {
                path: 'customers',
                children: [
                    {
                        path: '',
                        element: <Customers/>
                    },
                    {
                        path: ':customerId',
                        element: <Customer/>,
                        children: [
                            {
                                path: '',
                                element: <CustomerSummary/>
                            },
                            {
                                path: 'orders',
                                element: <CustomerOrders/>
                            }
                        ]
                    }
                ]
            },
            {
                path: 'orders',
                children: [
                    {
                        path: '',
                        element: <Orders/>
                    },
                    {
                        path: ':orderId',
                        element: <Order/>
                    },
                    {
                        path: 'create',
                        element: <OrderCreate/>
                    }
                ]
            },
            {
                path: 'products',
                children: [
                    {
                        path: '',
                        element: <Products/>
                    },
                    {
                        path: ':productId',
                        element: <Product/>,
                        children: [
                            {
                                path: '',
                                element: <ProductSummary/>
                            },
                            {
                                path: 'analytics',
                                element: <ProductAnalytics/>
                            },
                            {
                                path: 'inventory',
                                element: <ProductInventory/>
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: 'login',
        element: (
            <GuestGuard>
                <Login/>
            </GuestGuard>
        )
    },
    {
        path: 'register',
        element: (
            <GuestGuard>
                <Register/>
            </GuestGuard>
        )
    },
    {
        path: 'verify-code',
        element: (
            <GuestGuard>
                <VerifyCode/>
            </GuestGuard>
        )
    },
    {
        path: '*',
        element: <NotFound/>
    }
];

export default routes;
