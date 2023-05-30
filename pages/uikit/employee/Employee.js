import { ListItem, ListItemText } from "@mui/material"

const Employee = ({id, timestamp, name, email, telepon, jabatan}) => {
      
    return (
        <ListItem
            sx={{ mt: 3, boxShadow: 3 }}
            style={{backgroundColor:'#FAFAFA'}}
        >
            <ListItemText
                primary={name}
                secondary={jabatan}
            />

        </ListItem>
    )
}

export default Employee