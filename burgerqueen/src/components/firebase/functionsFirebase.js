import { collection, addDoc, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import db from './firebaseConfig';

export const createOrder = async (table, name, quant, product, subtotal, prices, state, date, tempInit, tempEnd) => {
    return await addDoc(collection(db, 'orders'), {
        table,
        name,
        quant,
        product,
        subtotal,
        prices,
        state,
        date,
        tempInit,
        tempEnd,

    })
}
export const getOrders =  async () => {
    return await getDocs(collection(db, 'orders'));
}

export const getOrder = async (id) => {
    const docRef = doc(db, "orders", id);
    return await getDoc(docRef);
}

export const updateOrder = async (id, state) => {
    const docRef = doc(db, "orders", id);
    return await updateDoc(docRef, state)
} 

