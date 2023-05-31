import { Grid } from "@mui/material";
import { collection, doc, getDocs,getDoc} from "firebase/firestore";
import { db } from "../../../../firebase";

const Detail = ({memberProps}) => {
  const member = JSON.parse(memberProps)
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
        {member.name}: {member.alamat}: {member.usia}: {member.telepon}
        
    </Grid>
  );
};

export default Detail;

export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, 'members'));
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

  const docRef = doc(db, "members", id );
  const docSnap = await getDoc(docRef);

  return {
    props: {memberProps: JSON.stringify(docSnap.data()) || null}
  }
}
 