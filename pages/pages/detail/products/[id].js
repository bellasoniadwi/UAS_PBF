import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { collection, doc, getDocs,getDoc} from "firebase/firestore";
import { db } from "../../../../firebase";
import Link from "next/link";

const Detail = ({productProps}) => {
  const product = JSON.parse(productProps)
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
        <Grid item x5={1}>
          <Card sx={{minWidth:1000, boxShadow:3, minHeight:500}} style={{backgroundColor:'#FAFAFA'}}>
          <CardContent>
            <Typography variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography sx={{mb:1.5}} color="text.secondary">
              {product.kategori}
            </Typography>
            <Typography sx={{mb:1.5}} color="text.secondary">
              {product.harga}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href="/uikit/product">
              <Button size="small">Back to List</Button>
            </Link>
          </CardActions>
          </Card>
        </Grid>
        
    </Grid>
  );
};

export default Detail;

export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, 'products'));
  const paths = snapshot.docs.map(doc => {
    return{
      params: {id: doc.id.toString()}
    }
  })

  return{
    paths,
    fallback: false
  }
}

export const getStaticProps = async(context) => {
  const id = context.params.id;

  const docRef = doc(db, "products", id );
  const docSnap = await getDoc(docRef);

  return {
    props: {productProps: JSON.stringify(docSnap.data()) || null}
  }
}
 