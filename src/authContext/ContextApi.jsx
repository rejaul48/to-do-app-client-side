import { createContext, useEffect, useState } from "react";
import {

    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,


} from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const ToDoContext = createContext()
export const auth = getAuth(app)

const ToDoProvider = ({ children }) => {



    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)
    const [currentUser, setCurrentUser] = useState(null);
    const axiosPublic = useAxiosPublic();


    // toggle mode
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Function to toggle theme
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Persist the theme in localStorage
    };

    // Apply theme to body element when it changes
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    // toggle mode 


    // Fetch current user based on email
    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/register-people/${user?.email}`)
                .then(res => {
                    setCurrentUser(res?.data[0]);
                    setLoader(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoader(false);
                });
        }
    }, [user?.email]);


    // cleate new user

    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // logout
    const userLogOut = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                setCurrentUser(null)
            })
            .catch((err) => {
                console.error("Something went wrong:", err);
            });
    };

    // login register user
    const loginRegisterUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // login with google
    const provider = new GoogleAuthProvider()
    const loginWithGoogle = () => {
        return signInWithPopup(auth, provider)
    }

    const info = {
        user,
        setUser,
        createNewUser,
        loader,
        setLoader,
        userLogOut,
        loginRegisterUser,
        currentUser,
        setCurrentUser,
        loginWithGoogle,
        theme,
        toggleTheme,
        setTheme
    }

    // Firebase Authentication Observer
    useEffect(() => {
        setLoader(true);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth State Changed:", currentUser);
            setUser(currentUser);
            setLoader(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <ToDoContext.Provider value={info}>

            {
                children
            }

        </ToDoContext.Provider>
    )

}

export default ToDoProvider

