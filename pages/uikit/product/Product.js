import { ListItem, ListItemText } from "@mui/material"

const Product = ({id, timestamp, name, harga, kategori}) => {
      
    return (
        <ListItem
            sx={{ mt: 3, boxShadow: 3 }}
            style={{backgroundColor:'#FAFAFA'}}
        >
            <ListItemText
                primary={name}
                secondary={harga}
            />

        </ListItem>
    )
}

export default Product