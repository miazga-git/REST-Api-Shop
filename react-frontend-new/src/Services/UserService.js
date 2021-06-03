
import axios from 'axios';

const LOGIN_API_BASE_URL = "http://localhost:8080/login";
const REGISTER_API_BASE_URL = "http://localhost:8080/register";

class UserService {

    authenticateUser(user) {
        return axios.post(LOGIN_API_BASE_URL, user);
    }
    createUser(user) {
        return axios.post(REGISTER_API_BASE_URL, user);
    }
}
export default new UserService()