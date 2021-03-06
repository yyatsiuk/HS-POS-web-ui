import PropTypes from 'prop-types';
import {formatDistanceToNowStrict, parseISO} from 'date-fns';
import {Avatar, Box, Button, Card, Typography} from '@material-ui/core';
import {useTranslation} from "react-i18next";

export const CustomerNote = (props) => {
    const {
        content,
        createdAt,
        id,
        onDelete,
        senderAvatar,
        senderName,
        deletable,
        sx,
        ...other
    } = props;
    const {t} = useTranslation();

    return (
        <Card
            sx={{
                display: 'flex',
                p: 2,
                ...sx
            }}
            variant="outlined"
            {...other}
        >
            <Avatar src={senderAvatar}/>
            <Box
                sx={{
                    flex: 1,
                    ml: 2
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"
                >
                    {senderName}
                </Typography>
                <Typography
                    color="textPrimary"
                    sx={{my: 1}}
                    variant="body2"
                >
                    {content}
                </Typography>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    <Typography
                        color="textSecondary"
                        variant="caption"
                    >
                        {`${formatDistanceToNowStrict(parseISO(createdAt))} ago`}
                    </Typography>
                    <Box sx={{flexGrow: 1}}/>
                    {deletable && (
                        <Button
                            color="primary"
                            onClick={() => onDelete?.(id)}
                            size="small"
                            variant="text"
                        >
                            {t("Delete")}
                        </Button>
                    )}
                </Box>
            </Box>
        </Card>
    );
};

CustomerNote.propTypes = {
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    deletable: PropTypes.bool,
    id: PropTypes.number.isRequired,
    onDelete: PropTypes.func,
    senderAvatar: PropTypes.string.isRequired,
    senderName: PropTypes.string.isRequired,
    sx: PropTypes.object
};
