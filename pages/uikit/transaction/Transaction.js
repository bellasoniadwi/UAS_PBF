import { ListItem, ListItemText } from "@mui/material"

const Transaction = ({id, timestamp, name, total, product}) => {
      
    return (
        <ListItem
            sx={{ mt: 3, boxShadow: 3 }}
            style={{backgroundColor:'#FAFAFA'}}
        >
            <ListItemText
                primary={name}
                secondary={total}
            />

        </ListItem>
    )
}

export default Transaction