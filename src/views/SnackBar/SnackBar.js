import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {withStyles} from '@material-ui/styles';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props}
    />;
}

const styles = {
    error: {
        background: '#F7685B',
        borderRadius: 8,
        fontSize: '16px',
        fontFamily: 'Poppins',
        paddingLeft: '40px',
    },
    success: {
        background: '#4095FA',
        borderRadius: 8,
        fontSize: '16px',
        fontFamily: 'Poppins',
        paddingLeft: '40px',
    },
};

function CustomSnackbar(props) {
    // const {classes, children, className, ...other} = props;
    const {classes, ...other} = props;
    const duration = props.duration ? props.duration : 4000;
    return (

        <Snackbar
            {...other}
            autoHideDuration={duration}
            ContentProps={{
                classes:
                    {
                        root: ((props.state === 'error') ? classes.error : classes.success),
                    },
            }}
            open={props.open}
            onClose={props.onClose}
        >
            {props.state === 'error' ?
                <Alert onClose={props.onClose} severity="error" className={classes.error}>
                    {props.message}
                </Alert> :
                <Alert onClose={props.onClose} severity="success" className={classes.success}>
                    {props.message}
                </Alert>}
        </Snackbar>
    );
}

export default withStyles(styles)(CustomSnackbar);
