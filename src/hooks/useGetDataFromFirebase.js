import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userDataCollection } from "../components/firebase/firebase-config";
import Loading from "../components/helpers/loading/Loading";

const useGetDataFromFirebase = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataForUser, setDataForUser] = useState([]);
  const { user } = useSelector((state) => state.auth);

  //get the userData from firebase
  useEffect(() => {
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
      };
      getData();
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  }, []);

  //when the data is available get the data for the current user
  useEffect(() => {
    if (data && data.length !== 0) {
      const currentUserData = data.find((item) => item.id === user?.id);
      setDataForUser(currentUserData?.document?.userData);
    }
  }, [data, user]);

  if (loading) return <Loading />;

  return dataForUser;
};

export default useGetDataFromFirebase;
