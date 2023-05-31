import { Grid } from "@mui/material";
import { collection, doc, getDocs,getDoc} from "firebase/firestore";
import { db } from "../../../../firebase";

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
        {transaction.name}: {transaction.product}: {transaction.total}
        
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
 