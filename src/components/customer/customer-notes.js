import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Box, Typography} from '@material-ui/core';
import {CustomerNote} from './customer-note';
import {CustomerNoteAdd} from './customer-note-add';
import {useTranslation} from "react-i18next";
import {useAuth} from "../../hooks/use-auth";
import {customerApi} from "../../api/customer";
import {useParams} from "react-router-dom";

export const CustomerNotes = (props) => {
    const {notes: notesProp, ...other} = props;
    const [notes, setNotes] = useState(notesProp || []);
    const {user} = useAuth();
    const {customerId} = useParams();
    const {t} = useTranslation();

    const handleNoteSend = async (content) => {
        const note = await customerApi.createNote(customerId, {
            senderId: user?.id,
            content,
        });

        setNotes((prevNotes) => [
            note, ...prevNotes
        ]);
    };

    const handleNoteDelete = async (noteId) => {
        await customerApi.deleteNote(customerId, noteId);
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    };

    useEffect(() => {
        setNotes(notesProp);
    }, [notesProp]);

    return (
        <Box {...other}>
            <Typography
                color="textPrimary"
                variant="h6"
                sx={{mb: 3}}
            >
                {t("Team Notes")}
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gap: 3
                }}
            >
                <CustomerNoteAdd onSend={handleNoteSend}/>
                {notes.map((note) => (
                    <CustomerNote
                        content={note.content}
                        createdAt={note.createdAt}
                        deletable={note.senderId === user.id}
                        id={note.id}
                        key={note.id}
                        onDelete={handleNoteDelete}
                        senderAvatar={note.senderAvatar}
                        senderName={note.senderName}
                    />
                ))}
            </Box>
        </Box>
    );
};

CustomerNotes.defaultProps = {
    notes: []
};

CustomerNotes.propTypes = {
    notes: PropTypes.array
};
