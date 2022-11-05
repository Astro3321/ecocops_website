import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout(){
        return signOut(auth);
    }

    function uploadFile(fileRef, file){
        return uploadBytes(fileRef, file);
    }

    function fetchDownloadURL(fileRef){
        return getDownloadURL(fileRef);
    }

    function addPost(data, postRef){
        const postCollecitonRef = collection(db, postRef);
        return addDoc(postCollecitonRef, data);
    }

    async function fetchPost(postID, ref){
        const postRef = collection(db, ref);
        const q = query(postRef, where('id', '==', `${postID}`));
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    });

    const value = {
        currentUser,
        login,
        logout,
        uploadFile,
        fetchDownloadURL,
        addPost,
        fetchPost
    };

    return (<AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>);
}
