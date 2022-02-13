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
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    // validates username
    const [validName, setValidName] = useState(false);
    // If focus on input field
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    // validates password
    const [validPwd, setValidPwd] = useState(false);
    // If focus on input field
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    // validates matching password
    const [validMatch, setValidMatch] = useState(false);
    // if focus on input field
    const [matchFocus, setMatchFocus] = useState(false);

    // for error and success messages
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    // this useEffect will happen on page load
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // this useEffect will happen everytime user is changed
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    // useEffect for password
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    // useEffect for error message
    useEffect(() => {
        setErrMsg("");
        // if any of dependencies below of user, pwd, matchPwd are changed then it will clear out error message
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with sj hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        console.log(user, pwd);
        setSuccess(true);
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            {/* if username is valid then show else hide */}
                            <span className={validName ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            {/* if username exists and or user state is empty then set to hide else set to invalid */}
                            <span
                                className={
                                    validName || !user ? "hide" : "invalid"
                                }
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            // provides focus
                            ref={userRef}
                            // don't want to see previous user input recommendations
                            autoComplete="off"
                            // ties input to user state
                            onChange={(e) => setUser(e.target.value)}
                            required
                            // this will check if username has passed
                            aria_invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        {/* the uidnote(user id note), if it has userFocus set to true and there is a user and it is not a valid name then set instructions else leave offscreen */}
                        <p
                            id="uidnote"
                            className={
                                userFocus && user && !validName
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24
                            characters.
                            <br /> Letters, numbers, underscores, hyphens
                            allowed.
                        </p>

                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validPwd ? "valid" : "hide"}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validPwd || !pwd ? "hide" : "invalid"
                                }
                            />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p
                            id="pwdnote"
                            // if password focus exists and is not valid password
                            className={
                                pwdFocus && !validPwd
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.
                            <br />
                            Must include uppercase and lowercase letters, a
                            number and a special character.
                            <br />
                            Allowed special characters:{" "}
                            <span aria-label="exclamation mark">!</span>{" "}
                            <span aria-label="at symbol">@</span>{" "}
                            <span aria-label="hashtag">#</span>{" "}
                            <span aria-label="dollar sign">$</span>{" "}
                            <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={
                                    validMatch && matchPwd ? "valid" : "hide"
                                }
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validMatch || !matchPwd ? "hide" : "invalid"
                                }
                            />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p
                            id="confirmnote"
                            className={
                                matchFocus && !validMatch
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button
                            disabled={
                                !validName || !validPwd || !validMatch
                                    ? true
                                    : false
                            }
                        >
                            Sign Up
                        </button>
                        <p>
                            Already registered?
                            <br />
                            <span className="line">
                                {/* put router link here */}
                                <a href="#">Sign In</a>
                            </span>
                        </p>
                    </form>
                </section>
            )}
        </>
    );
};

export default Register;
