import { getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cartCollection } from "../components/firebase/firebase-config";

const useGetCartFromFirebase = () => {
  const [cart, setCart] = useState([]);
  const [cartItemsForCurrentUser, setCartItemsForCurrentUser] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    //get the cart from firebase
    try {
      const getData = async () => {
        const data = await getDocs(cartCollection).then((snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return { document: doc.data(), id: doc.id };
          });
          return data;
        });
        setCart(data);
        console.log("hi");
      };
      getData();
    } catch (error) {
      console.log(error);
    }

    //clean up
    // return () => getData()
  }, []);

  // if (data.length !== 0) {
  //     dispatch(updateLibraryState({ user: currentUser, userData: data }));
  //   }

  //when the data is available get the cart for the current user
  useEffect(() => {
    if (cart && cart.length !== 0) {
      const cartItems = cart.find((item) => item.id === user?.id);
      setCartItemsForCurrentUser(cartItems?.document?.cartItems);
    }
  }, [cart, user]);

  return cartItemsForCurrentUser;
};

export default useGetCartFromFirebase;
