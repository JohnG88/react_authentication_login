import { useRef, useState, useEffect } from "react";
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// username can start with [a-zA-Z], lowercase a-z or uppercase A-Z and can be followed by {3,23}, 3 to 232 characters that can be [a-zA-Z0-9-_], lowercase a-z or uppercase A-Z or any digits or hyphens or underscores
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

// password requires (?=.*[a-z]), one lowercase letter, (?=.*[A-Z]), one uppercase letter, (?=.*[0-9]), one digit, and (?=.*[!@#$%]), one special character, and has to be anywhere from 8 to 24 characters long
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const useRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    // validates username
    const [validName, setValidName] = useState(false);
    // If focus on input field
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    // validates password
    const [validPwd, setValidPwd] = useState(false);
    // If focus on input field
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    // validates matching password
    const [validMatch, setValidMatch] = useState(false);
    // if focus on input field
    const [matchFocus, setMatchFocus] = useState(false);
    
    // for error and success messages
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // this useEffect will happen on page load
    useEffect(() => {
        useRef.current.focus();
    }, [])
    
    // this useEffect will happen everytime user is changed
    useEffect(() => {
        const result  = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    // useEffect for password
    useEffect(() => {
        const result  = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    // useEffect for error message
    useEffect(() => {
        setErrMsg('');
        // if any of dependencies below of user, pwd, matchPwd are changed then it will clear out error message
    }, [user, pwd, matchPwd])

    return (
        <div>

        </div>
    )
};

export default Register;
