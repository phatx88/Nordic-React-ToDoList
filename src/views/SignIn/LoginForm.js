import React from 'react'
import styles from './signIn.module.css';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
import {withStyles, makeStyles} from '@material-ui/core';
import Zoom from 'react-reveal/Zoom';
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

function LoginForm() {
    const classes = useStyles();
    let history = useHistory();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const login = async ()=>{
        const Axios = createRequest()
        setLoading(true);
        try {
            const res = await Axios.post('user/login',{email,password})
            if (res.status===200) {
                localStorage.setItem('idToken',res.data.token)
                console.log('login success')
            }
            setLoading(false);
            console.log(res);
            history.push("/home")
        } catch (error) {
            setLoading(false);
            console.log(error.response.data.message);
            setError(error.response.data.message)
        }
    }

    return (
        
        <div>
            <Zoom>
                    <div  className={styles.textContainer}>
                        <div style={{width:'100%'}}>
                            <CssTextField
                            style={{width:'100%'}}
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            // error={error}
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
                        {loading ? <CircularProgress style={{'color': 'yellow'}} size={50}/>:<div className={styles.btn1} onClick={login}>Login</div>}
                    </div>
                    </Zoom>
                    <CustomSnackbar
                        open={error !== ''}
                        onClose={()=>setError('')}
                        state={'error'}
                        message={error}
                        duration={2000}
                    />
                    </div>
    )
}

export default LoginForm
