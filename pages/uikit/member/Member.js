import { ListItem, ListItemText } from "@mui/material"

const Member = ({id, timestamp, name, alamat, telepon, usia}) => {
      
    return (
        <ListItem
            sx={{ mt: 3, boxShadow: 3 }}
            style={{backgroundColor:'#FAFAFA'}}
        >
            <ListItemText
                primary={name}
                secondary={alamat}
            />

        </ListItem>
    )
}

export default Member