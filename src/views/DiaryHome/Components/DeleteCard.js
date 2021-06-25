import React from 'react'
import {Dialog,makeStyles,Button,Slide} from '@material-ui/core';
import {styled} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const DeleteButton = styled(Button)({
    'borderRadius': 12,
    'height': '55px',
    'background': '#f44336',
    'fontStyle': 'normal',
    'fontWeight': 700,
    'fontSize': 17,
    'letterSpacing': 1,
    'color': '#F3F7FB',
    'textTransform': 'none',
    'width': '100%',
    '&&:hover': {
        background: 'red',
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
        paddingRight: 60,
        width: 400,
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

function DeleteCard(props) {
    
    const classes = useStyles();

    const handleClose = () => {
        props.setOpen(false);
      };

    const deleteThisTask = () => {
          console.log(props.currentTask._id)
          console.log(props.currentTask.title)
          props.deleteTask();
      }

    return (
        <Dialog
            disableBackdropClick={false}
            TransitionComponent={Transition}
            fullWidth
            keepMounted
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
            <div style={{textAlign: 'center'}}>
                <ReportProblemRoundedIcon style={{fontSize: 100, color: '#f44336', marginBottom: 15}}/>
            </div>
            
            <div style={{textAlign: 'center', fontSize:20, marginBottom: 15}}>
                Are you sure you want to delete the<br/> <b>{props.currentTask.title}</b> task?
            </div>

            <DeleteButton onClick={deleteThisTask} style={{marginTop: 30}}>Delete Task</DeleteButton>
        </div>
        </Dialog>
    )
}

export default DeleteCard

