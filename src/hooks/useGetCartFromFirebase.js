import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDataCollection } from "../components/firebase/firebase-config";
import Loading from "../components/helpers/loading/Loading";

const useGetCartFromFirebase = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataForUser, setDataForUser] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    //get the cart from firebase
    setLoading(true);
    try {
      const getData = async () => {
        const data = await getDocs(userDataCollection).then((snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return { document: doc.data(), id: doc.id };
          });
          return data;
        });
        setData(data);
        console.log("hi");
      };
      getData();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  //when the data is available get the cart for the current user
  useEffect(() => {
    if (data && data.length !== 0) {
      const userData = data.find((item) => item.id === user?.id);
      setDataForUser(userData?.document?.userData);
    }
  }, [data, user]);

  if (loading) return <Loading />;

  return dataForUser;
};

export default useGetCartFromFirebase;