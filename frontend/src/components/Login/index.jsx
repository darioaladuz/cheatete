// import { useContext } from "react";
// import { UserContext } from "../../UserContext";
import { useEffect, useState } from "react";
import linksService from "../../services/links";
import usersService from "../../services/users";
// import { Navigate } from "react-router-dom";

export default function Login(){
    // const { user, setUser } = useContext(UserContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('user');
        if(loggedUser) {
          setUser(JSON.parse(loggedUser));
          usersService.setToken(JSON.parse(loggedUser).token);
          linksService.setToken(JSON.parse(loggedUser).token);
        //   console.log(loggedUser);
        }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();
    
        const user = {
          username: e.target.username.value,
          password: e.target.password.value
        }
    
        try {
          const loggedUser = await usersService.login(user);
          setUser(loggedUser);
          usersService.setToken(loggedUser.token);
          linksService.setToken(loggedUser.token);
          window.localStorage.setItem('user', JSON.stringify(loggedUser));
          console.log(loggedUser);
        } catch(error) {
          console.log(error);
        }
      }
    
    if(user){
        return "";
    }

    return (
        <div className="page login-page auth-page">
          {/* <h2>Log In</h2> */}
          <form onSubmit={ handleLogin } action="" className="login">
            <input type="text" name="username" required placeholder="username0847" />
            <input type="password" name="password" required placeholder="********" />
            <input type="submit" value="Log In" name="submit" />
          </form>
        </div>
    )
}