import React from 'react'
import styles from './signIn.module.css';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Fade from 'react-reveal/Fade';
import { useHistory } from "react-router-dom";

function SignIn() {
    const [state, setstate] = React.useState('login')
    let history = useHistory();
    React.useEffect(() => {
        if (localStorage.getItem('idToken')){
            history.push("/home")
        }
    }, [history])
    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
            <Fade  top>
                <div className={styles.imgContainer}>
                    <img className={styles.img} src="/icon.png" alt="APP Icon"/>
                    <div>
                        <span style={{"color":"white",marginLeft:'15px'}}>Nordic-todo-list</span>
                    </div>
                </div>
                </Fade >
                <div className={styles.signInContainer}>
                
                    <div className={styles.signInDiv}>
                        <div className={state==='login' ? styles.selectedOne:undefined} onClick={()=>setstate('login')}>
                            Login
                        </div>
                        <div className={state==='register' ? styles.selectedOne:undefined} onClick={()=>setstate('register')}>
                            Register
                        </div>
                    </div>
                    {state==='login'?<LoginForm/>:<RegisterForm setstate={setstate}/>}
                    
                </div>

            </div>
        </div>
    )
}

export default SignIn
