import React, {useState} from "react";
import { loginUser, addUser } from "../api/login-API";
import { useForm } from "react-hook-form";

function Login() {
  const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [action, setAction] = useState("login");

    const onSubmit = async (data) => {
      try {
        if(action == "login"){
          const Response = await loginUser(data);
      }else{
        const Response = await addUser(data);
      }
    } catch(error){
      console.error("error: ", error);
    }
    };

    return (
        <><center>
            <h2>{action == "login" ? "Login" : "Sign Up"}</h2>

            <form className="App" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("username", { required: true })}
                    placeholder="Username"
                />
                {errors.username && <span style={{ color: "red" }}>*Username* is mandatory</span>}<br></br><br></br>

                <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                />
                {errors.password && <span style={{ color: "red" }}>*Password* is mandatory</span>}<br></br><br></br>

                <button type="submit" onClick={() => setAction("login")}>login</button>
                <button type="submit" onClick={() => setAction("signup")}>Sign Up</button>
            </form>
            </center>
        </>
    );
}

export default Login;