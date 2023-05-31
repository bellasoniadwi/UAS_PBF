import { Grid } from "@mui/material";
import { collection, doc, getDocs,getDoc} from "firebase/firestore";
import { db } from "../../../../firebase";

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
        {product.name}: {product.harga}: {product.kategori}
        
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
 