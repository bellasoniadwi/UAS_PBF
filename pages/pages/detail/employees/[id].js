import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { collection, doc, getDocs,getDoc} from "firebase/firestore";
import { db } from "../../../../firebase";
import Link from "next/link";


const Detail = ({employeeProps}) => {
  const employee = JSON.parse(employeeProps)
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
              {employee.name}
            </Typography>
            <Typography sx={{mb:1.5}} color="text.secondary">
              {employee.email}
            </Typography>
            <Typography sx={{mb:1.5}} color="text.secondary">
              {employee.telepon}
            </Typography>
            <Typography sx={{mb:1.5}} color="text.secondary">
              {employee.jabatan}
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
  const snapshot = await getDocs(collection(db, 'employees'));
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

  const docRef = doc(db, "employees", id );
  const docSnap = await getDoc(docRef);

  return {
    props: {employeeProps: JSON.stringify(docSnap.data()) || null}
  }
}
 