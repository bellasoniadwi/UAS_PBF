import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { collection, doc, getDocs,getDoc} from "firebase/firestore";
import { db } from "../../../../firebase";
import Link from "next/link";

const Detail = ({transactionProps}) => {
  const transaction = JSON.parse(transactionProps)
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
              {transaction.name}
            </Typography>
            <Typography sx={{mb:1.5}} color="text.secondary">
              {transaction.product}
            </Typography>
            <Typography sx={{mb:1.5}} color="text.secondary">
              {transaction.total}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href="/uikit/employee">
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
  const snapshot = await getDocs(collection(db, 'transactions'));
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

  const docRef = doc(db, "transactions", id );
  const docSnap = await getDoc(docRef);

  return {
    props: {transactionProps: JSON.stringify(docSnap.data()) || null}
  }
}
 