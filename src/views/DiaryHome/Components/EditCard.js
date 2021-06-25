import React from 'react'
import {Dialog,makeStyles,Button,Slide} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {styled} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const SaveButton = styled(Button)({
    'borderRadius': 12,
    'height': '55px',
    'background': '#4B76D1',
    'fontStyle': 'normal',
    'fontWeight': 700,
    'fontSize': 17,
    'letterSpacing': 1,
    'color': '#F3F7FB',
    'textTransform': 'none',
    'width': '100%',
    '&&:hover': {
        background: '#4B76D1',
    },
});

const useStyles = makeStyles(() => ({
    input: {
        borderRadius: 0,
    },
    labelRoot: {
        'fontFamily': 'Inter',
        'fontSize': '16px',
    },
    root: {
        border: '1px solid',
        backgroundColor: '#FDFDFD !important',
        borderRadius: '8px',
        fontSize: '16px',
        borderColor: 'gray',
    },
    dialogPaper: {
        borderRadius: 20,
        paddingTop: 50,
        paddingBottom: 80,
        paddingLeft: 60,
        paddingRight: 60
    },
    underline: {
        '&&&:before': {
            borderBottom: '1px solid rgba(0, 0, 0, 0)',
        },
        '&&&hover': {
            borderBottom: '0px solid rgba(0, 0, 0, 1)',
        },
        '&&:after': {
            borderBottom: '0px solid rgba(0, 0, 0, 1)',
        },
    },
}));

function EditCard(props) {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const classes = useStyles();

    const handleClose = () => {
        props.setOpen(false);
      };

    const setFields = () => {
        setTitle(props.currentTask.title);
        setDescription(props.currentTask.description);
      };

    const editTask = () => {
        props.editTask(title, description)
      };

    return (
        <Dialog
            disableBackdropClick={false}
            TransitionComponent={Transition}
            fullWidth
            keepMounted
            onEnter={setFields}
            open={props.open}
            onClose={handleClose}
            onBackdropClick={handleClose}
            scroll="body"
            maxWidth="sm"
            PaperProps={{
                classes: {
                root: classes.dialogPaper,
                },
            }}
        >
        <div>
            <div style={{textAlign: 'right'}}>
                <CloseIcon onClick={handleClose} style={{cursor: 'pointer'}}/>
            </div>
            <h1 style={{textAlign: 'center', marginTop: 0}}>Edit Task</h1>
            <TextField
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                style={{marginTop: 30}}
                fullWidth
                id="outlined-error-helper-text"
                required
                label="Title"
                variant="filled"
                placeholder="Title"
                inputProps={{ style: { WebkitBoxShadow: "0 0 0 1000px white inset" }}}
                InputLabelProps={{
                    classes: {
                        root: classes.labelRoot,
                    },
                }}
                InputProps={{
                    disableUnderline: true,
                    classes: {
                    
                        root: classes.root,
                    },
                }}
            />
            <TextField
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                style={{marginTop: 20}}
                fullWidth
                multiline
                id="outlined-error-helper-text"
                required
                label="Description"
                variant="filled"
                placeholder="Description"
                inputProps={{ style: { WebkitBoxShadow: "0 0 0 1000px white inset" }}}
                InputLabelProps={{
                    classes: {
                        root: classes.labelRoot,
                    },
                }}
                InputProps={{
                    classes: {
                        input: classes.input,
                        underline: classes.underline,
                        root: classes.root,
                    },
                }}
            />
            <SaveButton onClick={editTask} style={{marginTop: 30}}>Save Changes</SaveButton>
        </div>
        </Dialog>
    )
}

export default EditCard
