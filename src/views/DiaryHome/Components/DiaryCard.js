import React,{useState} from 'react'
import styles from './diaryCard.module.css';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import LightSpeed from 'react-reveal/LightSpeed';
import moment from 'moment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function DiaryCard({card, editAccess, setCurrentTask, setEditDialog,setDeleteDialog}) {

    const [showMore, setstate] = useState(false)

    const getDescription=()=>{
        if(card.description.length>30 && !showMore){
            let smallDescription=card.description.substring(0,30);
            return(
                <div>{smallDescription} ...</div>
            )
        }
        else{
            return<div>{card.description}</div>
        }
    }

    const editThisCard = () => {
        setEditDialog(true);
        setCurrentTask(card)
    }

    const deleteThisCard = () => {
        setCurrentTask(card)
        setDeleteDialog(true);
    }

    return (
        <div>
        <LightSpeed left>
        <div className={styles.container}>

        <div className={styles.subtitle}>
            <AccountCircleIcon/>
            <div style={{marginLeft: 5}}>{card.user.name}</div>
        </div>

            <div className={styles.title}>
                {card.title}
            </div>

            

            <div className={styles.description}> 
                {getDescription()} 
            </div>

            {card.description.length>30 ?
                <div className={styles.showMore}>
                    {showMore?<div onClick={()=>setstate(false)}>SHOW LESS</div> : <div onClick={()=>setstate(true)}>SHOW MORE</div>}
                </div>:<div style={{height: 36}}></div>
            }

            <div style={{textAlign: 'right', display: 'flex', justifyContent: 'space-between', height: 48}}>
                <div className={styles.dateField}>
                    <div>
                        {moment(card.createdAt).format('DD MMM YYYY, hh:mm a')}
                    </div>
                </div>
                <div>
                {editAccess &&<><IconButton onClick={editThisCard}><EditIcon style={{color: '#1a73e8'}}/></IconButton><IconButton onClick={deleteThisCard}><DeleteIcon color='error'/></IconButton></>}
                </div>
            </div>
        </div>
        </LightSpeed>
        </div>
    )
}

DiaryCard.propTypes = {
    title: PropTypes.string,
    subtitle:PropTypes.string,
    description:PropTypes.string,
    bgColor:PropTypes.string
  };

export default DiaryCard
