import PropTypes from 'prop-types';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import {useTranslation} from 'react-i18next';
import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Popover,
    Switch,
    Typography
} from '@material-ui/core';
import {InputField} from './input-field';
import {useAuth} from '../hooks/use-auth';
import {usePopover} from '../hooks/use-popover';
import {ChevronDown as ChevronDownIcon} from '../icons/chevron-down';
import {Logout as LogoutIcon} from '../icons/logout';
import {User as UserIcon} from '../icons/user';
import {lightNeutral} from '../colors';

const languageOptions = {
    en: {
        label: 'English'
    },
    ukr: {
        label: 'Українська'
    }
};

export const AccountPopover = (props) => {
    const {
        darkMode,
        onLanguageChange,
        onSwitchTheme,
    } = props;
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const {logout} = useAuth();
    const [anchorRef, open, handleOpen, handleClose] = usePopover();

    const handleLanguageChange = (event) => {
        onLanguageChange(event.target.value);
    };

    const handleLogout = async () => {
        try {
            handleClose();
            await logout();
            navigate('/');
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong');
        }
    };

    return (
        <>
            <Box
                onClick={handleOpen}
                ref={anchorRef}
                sx={{
                    alignItems: 'center',
                    cursor: 'pointer',
                    display: 'flex',
                    ml: 2
                }}
            >
                <Avatar
                    src="/static/user-chen_simmons.png"
                    variant="rounded"
                    sx={{
                        height: 40,
                        width: 40
                    }}
                />
                <Box
                    sx={{
                        alignItems: 'center',
                        display: {
                            md: 'flex',
                            xs: 'none'
                        },
                        flex: 1,
                        ml: 1,
                        minWidth: 120
                    }}
                >
                    <div>
                        <Typography
                            sx={{
                                color: lightNeutral[500]
                            }}
                            variant="caption"
                        >
                            CEO
                        </Typography>
                        <Typography
                            sx={{color: 'primary.contrastText'}}
                            variant="subtitle2"
                        >
                            Kate Heida
                        </Typography>
                    </div>
                    <ChevronDownIcon
                        sx={{
                            color: 'primary.contrastText',
                            ml: 1
                        }}
                    />
                </Box>
            </Box>
            <Popover
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom'
                }}
                keepMounted
                onClose={handleClose}
                open={open}
                PaperProps={{
                    sx: {
                        width: 260,
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }}
            >
                <List>
                    <ListItem divider>
                        <ListItemAvatar>
                            <Avatar
                                variant="rounded"
                                src="/static/user-chen_simmons.png"
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Kate Heida"
                            secondary="HEIDA LLC"
                        />
                    </ListItem>
                    <li>
                        <List disablePadding>
                            <ListSubheader disableSticky>
                                {t("App Settings")}
                            </ListSubheader>
                            <ListItem
                                sx={{
                                    display: {
                                        md: 'none',
                                        xs: 'flex'
                                    }
                                }}
                            >
                                <InputField
                                    fullWidth
                                    onChange={handleLanguageChange}
                                    select
                                    SelectProps={{native: true}}
                                    value={i18n.language}
                                >
                                    {Object.keys(languageOptions).map((option) => (
                                        <option
                                            key={option}
                                            value={option}
                                        >
                                            {languageOptions[option].label}
                                        </option>
                                    ))}
                                </InputField>
                            </ListItem>
                            <ListItem
                                sx={{
                                    py: 0,
                                    display: {
                                        md: 'none',
                                        xs: 'flex'
                                    }
                                }}
                            >
                                <Switch
                                    checked={darkMode}
                                    onChange={onSwitchTheme}
                                />
                                <Typography
                                    color="textPrimary"
                                    variant="body2"
                                >
                                    {t("Dark Mode")}
                                </Typography>
                            </ListItem>
                        </List>
                    </li>
                    <ListItem
                        button
                        component={RouterLink}
                        divider
                        onClick={handleClose}
                        to="/dashboard/account"
                    >
                        <ListItemIcon>
                            <UserIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t("Account")}/>
                    </ListItem>
                    <ListItem
                        button
                        onClick={handleLogout}
                    >
                        <ListItemIcon>
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t("Log out")}/>
                    </ListItem>
                </List>
            </Popover>
        </>
    );
};

AccountPopover.propTypes = {
    // @ts-ignore
    darkMode: PropTypes.bool.isRequired,
    onLanguageChange: PropTypes.func.isRequired,
    onSwitchTheme: PropTypes.func.isRequired,
};
