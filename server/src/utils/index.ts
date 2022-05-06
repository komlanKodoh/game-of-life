import * as api from "./api";
import { v4 as uuidv4 } from "uuid";

const getUUID = () => uuidv4();


export default { api, getUUID };
