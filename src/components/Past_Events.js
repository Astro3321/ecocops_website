import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase-config';
import Post from "./Post";

export default function Past_Events() {
    const postRef = collection(db, "past_events");
    const q = query(postRef, orderBy("timestamp"));
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const querySnapshot = await getDocs(q);
            const tempData = querySnapshot.docs.map((doc) => doc.data());     
            setData(tempData);
        };

        loadData();
    }, []);

    return (
        <div>
            {
                data.map(ele => (
                    <Post data={ele} />
                ))
            }
        </div>
    )
}
