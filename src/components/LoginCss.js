import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#dfe6e9',
        height: '100vh',
        width: '100vw'
    },
    container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    boxs: {
        padding: 5,
        margin: 5,
        background: '#fff',
        width: 350,
        height:390,
        borderRadius: 5,
    },
    boxes: {
        padding: 5,
        margin: 5,
        background: '#fff',
        width: 1050,
        // height:390,
        borderRadius: 5,
        marginRight:'18%'
    },
    box: {
        padding: 20,
        margin: 10,
        background: '#fff',
        width: 600,
        borderRadius: 10,
    },
    headline:{
        fontWeight:'bold',
        fontSize:'20px',
       

    },

  
})