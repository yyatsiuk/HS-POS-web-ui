import {useState} from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Card, Divider, IconButton, InputBase} from '@material-ui/core';
import {PaperClip as PaperClipIcon} from '../../icons/paper-clip';
import {useTranslation} from "react-i18next";

export const CustomerNoteAdd = (props) => {
    const {onSend, submitDisabled, ...other} = props;
    const [content, setContent] = useState('');
    const {t} = useTranslation();

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSend = () => {
        onSend?.(content);
        setContent('');
    };

    return (
        <Card
            variant="outlined"
            {...other}
        >
            <Box
                sx={{
                    p: 2,
                    alignItems: 'center',
                    display: 'flex'
                }}
            >
                <InputBase
                    multiline
                    onChange={handleChange}
                    placeholder={t("Comment text...")}
                    sx={{
                        flex: 1,
                        mr: 2
                    }}
                    value={content}
                />
                <IconButton size="small">
                    <PaperClipIcon fontSize="small"/>
                </IconButton>
            </Box>
            <Divider/>
            <Box
                sx={{
                    alignItems: 'center',
                    backgroundColor: 'neutral.100',
                    color: 'text.secondary',
                    display: 'flex',
                    p: 2
                }}
            >
                <Box sx={{flexGrow: 1}}/>
                <Button
                    color="primary"
                    disabled={content.length === 0 || submitDisabled}
                    onClick={handleSend}
                    variant="contained"
                >
                    {t("Send")}
                </Button>
            </Box>
        </Card>
    );
};

CustomerNoteAdd.defaultProps = {
    submitDisabled: false
};

CustomerNoteAdd.propTypes = {
    onSend: PropTypes.func,
    submitDisabled: PropTypes.bool
};
