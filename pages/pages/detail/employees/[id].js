import { Grid } from "@mui/material";
import { collection, doc, getDocs,getDoc} from "firebase/firestore";
import { db } from "../../../../firebase";

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
        {employee.name}: {employee.jabatan}: {employee.email}: {employee.telepon}
        
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
 