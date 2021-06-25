import React from 'react'
import styles from './signIn.module.css';
import TextField from '@material-ui/core/TextField';
import {withStyles, makeStyles} from '@material-ui/core';
import Zoom from 'react-reveal/Fade';
import createRequest from '../../utils/axios';
import CustomSnackbar from '../SnackBar/SnackBar';
import {CircularProgress} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    labelRoot: {
        'fontFamily': 'Inter',
        'fontSize': '16px',
    },
    root: {
        backgroundColor: '#FDFDFD !important',
        borderRadius: '8px',
        fontSize: '16px',
        borderColor: 'red',
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

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#4B76D1',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#4B76D1',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#BBD7FB',
                borderRadius: '8px',
            },
            '&:hover fieldset': {
                borderColor: '#4B76D1',
                borderRadius: '8px',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#4B76D1',
                borderRadius: '8px',
            },
        },
    },
})(TextField);

function RegisterForm(props) {
    const classes = useStyles();

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState('')

    const register = async () => {
        const Axios = createRequest()
        setLoading(true);
        console.log(email);
        try {
            const res = await Axios.post('user/register',{email,password,name})
            if (res.status===201) {
                setSuccess('Registereed Sucessfully');
            }
            setLoading(false);
            console.log(res);
        } catch (error) {
            setLoading(false);
            console.log(error.response.data.message);
            setError(error.response.data.message)
        }
    }
    const onClose = () => {
        props.setstate('login');
        setSuccess('')
    }
    return (
        <div>
    <Zoom>
                    <div  className={styles.textContainer}>
                    <div style={{width:'100%'}}>
                            <CssTextField
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            style={{width:'100%'}}
                            // error={error}
                            id="outlined-error-helper-text"
                            required
                            label="Your Name"
                            // helperText={error}
                            variant="filled"
                            placeholder="Your Name"
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    underline: classes.underline,
                                    root: classes.root,
                                },
                            }}
                            // onBlur={onBlue}
                            // value={nickName}
                            // onChange={e=>{setNickName(e.target.value);onBlue()}}
                            />
                        </div>
                        <div style={{width:'100%'}}>
                            <CssTextField
                            style={{width:'100%'}}
                            // error={error}
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            id="outlined-error-helper-text"
                            required
                            label="Email"
                            // helperText={error}
                            variant="filled"
                            placeholder="Email"
                            inputProps={{ style: { WebkitBoxShadow: "0 0 0 1000px white inset" }}}
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    underline: classes.underline,
                                    root: classes.root,
                                },
                            }}
                            // onBlur={onBlue}
                            // value={nickName}
                            // onChange={e=>{setNickName(e.target.value);onBlue()}}
                            />
                        </div>
                        <div style={{width:'100%'}}>
                            <CssTextField
                            fullWidth
                            // error={error}
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            id="outlined-error-helper-text"
                            required
                            label="Password"
                            type='password'
                            // helperText={error}
                            variant="filled"
                            placeholder="Password"
                            inputProps={{ style: { WebkitBoxShadow: "0 0 0 1000px white inset" }}}
                            InputLabelProps={{
                                classes: {
                                    root: classes.labelRoot,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    underline: classes.underline,
                                    root: classes.root,
                                },
                            }}
                            // onBlur={onBlue}
                            // value={nickName}
                            // onChange={e=>{setNickName(e.target.value);onBlue()}}
                            />
                        </div>
                    </div>
                        
                    <div style={{textAlign:"center"}}>
                        {loading ? <CircularProgress style={{'color': 'yellow'}} size={50}/>:<div onClick={register} className={styles.btn1}>Register</div>}
                    </div>
                    </Zoom>
                    <CustomSnackbar
                        open={error !== ''}
                        onClose={()=>setError('')}
                        state={'error'}
                        message={error}
                        duration={2000}
                    />
                    <CustomSnackbar
                        open={success !== ''}
                        onClose={onClose}
                        state={'success'}
                        message={success}
                        duration={2000}
                    />
                    </div>
    )
}

export default RegisterForm
