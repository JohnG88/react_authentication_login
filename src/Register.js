import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// username can start with [a-zA-Z], lowercase a-z or uppercase A-Z and can be followed by {3,23}, 3 to 232 characters that can be [a-zA-Z0-9-_], lowercase a-z or uppercase A-Z or any digits or hyphens or underscores
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

// password requires (?=.*[a-z]), one lowercase letter, (?=.*[A-Z]), one uppercase letter, (?=.*[0-9]), one digit, and (?=.*[!@#$%]), one special character, and has to be anywhere from 8 to 24 characters long
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;