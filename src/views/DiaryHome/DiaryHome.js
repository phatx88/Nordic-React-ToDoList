import React,{useState} from 'react'
import DiaryCard from './Components/DiaryCard';
import AddNew from './Components/AddNew';
import EditCard from './Components/EditCard';
import DeleteCard from './Components/DeleteCard';
import styles from './diaryHome.module.css';
import PropTypes from 'prop-types';
import Header from './Components/Header';
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import createRequest from '../../utils/axios';
import CustomSnackbar from '../SnackBar/SnackBar';
import { useHistory } from "react-router-dom";

function DiaryHome() {
    let history = useHistory();
    const [cards, setCards] = useState([])
    const [addNewDialog, setAddNewDialog] = useState(false)
    const [editDialog, setEditDialog] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const [success, setSuccess] = React.useState('')
    const [currentUser, setCurrentUser] = React.useState({})
    const [currentTask, setCurrentTask] = React.useState({})
    const [searchText, setSearchText] = React.useState('')

    const getUser = async () => {
        const Axios = createRequest()
        setLoading(true);
        try {
            const res = await Axios.get('user/me')
            if (res.status===201) {
                setCurrentUser(res.data);
                console.log('Get user success')
            }
            setLoading(false);
            console.log(res.data);
        } catch (error) {
            setLoading(false);
            console.log(error.response.data.message);
        }
    }

    const getTasks = async (searchText) => {
        const Axios = createRequest()
        setLoading(true);
        try {
            const res = await Axios.get('task/getAllTasks',{params: {
                title: searchText?searchText : '',
              }})
            if (res.status===201) {
                setCards(res.data);
                console.log('Get cards success')
                setAddNewDialog(false)
            }
            setLoading(false);
            console.log(res.data);
        } catch (error) {
            setLoading(false);
            console.log(error.response.data.message);
        }
    }

    const addTask = async (title, description) => {
        const Axios = createRequest()
        setLoading(true);
        try {
            const res = await Axios.post('task/addTask',{title, description})
            if (res.status===201) {
                setSuccess(res.data.message);
                getTasks();
                console.log('Add card success')
            }
            setLoading(false);
            console.log(res.data);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message)
            console.log(error.response.data.message);
        }
    }

    const editTask = async (title, description)  => {
        console.log({title, description});
        const Axios = createRequest()
        setLoading(true);
        try {
            const res = await Axios.patch(`task/editTask/${currentTask._id}`,{title, description})
            if (res.status===201) {
                setSuccess(res.data.message);
                setEditDialog(false);
                getTasks();
                console.log('Edit card success')
            }
            setLoading(false);
            console.log(res.data);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message)
            console.log(error.response.data.message);
        }
    }

    const deleteTask = async ()  => {
        const Axios = createRequest()
        setLoading(true);
        try {
            const res = await Axios.delete(`task/deleteTask/${currentTask._id}`)
            if (res.status===201) {
                setSuccess(res.data.message);
                setDeleteDialog(false);
                getTasks();
                console.log('Delete card success')
            }
            setLoading(false);
            console.log(res.data);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message)
            console.log(error.response.data.message);
        }
    }

    const onClose =() => {
        setSuccess('');
    }

    React.useEffect(() => {
        if (!localStorage.getItem('idToken')){
            history.push("/login")
        }
        getUser();
        getTasks();
    }, [history])

    React.useEffect(() => {
        getTasks(searchText);
    }, [searchText])

    return (
        <div className={styles.container}>

            <div className={styles.headerDiv}>
                <Header searchText={searchText} setSearchText={setSearchText} currentUser={currentUser}/>
            </div>

            <div>
                <div className={styles.cardContainer}>
                    <Grid justify="center" container spacing={0}>
                    {cards.map((card,index)=>{
                        return(
                            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>        
                                <DiaryCard setDeleteDialog={setDeleteDialog} setEditDialog={setEditDialog} setCurrentTask={setCurrentTask} editAccess={currentUser.type==='admin'?true:currentUser._id===card.user._id?true:false} card={card} bgColor="gray"/>
                            </Grid>
                            
                        )
                    })}
                    </Grid>
                </div>
            </div>
            <div style={{position: 'fixed', right: '60px', bottom: '40px'}}>
                <AddCircleIcon onClick={()=>setAddNewDialog(true)} className={styles.addIcon} style={{color: '#FFF', cursor: 'pointer'}}/>
            </div>
            <AddNew addTask={addTask} open={addNewDialog} setOpen={setAddNewDialog}/>
            <EditCard editTask={editTask} currentTask={currentTask} open={editDialog} setOpen={setEditDialog}/>
            <DeleteCard deleteTask={deleteTask} currentTask={currentTask} open={deleteDialog} setOpen={setDeleteDialog}/>
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

DiaryHome.propTypes = {
    cards:PropTypes.array,
    addCard:PropTypes.func
};

export default DiaryHome;