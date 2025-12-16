import React, {useState} from "react"; // Import React and useState hook for component state
import { loginUser, addUser } from "../api/login-API"; // Import API functions for login and signup
import { useForm } from "react-hook-form"; // Import react-hook-form for form handling and validation


function Login() {
// Destructure helpers from useForm for registering inputs,
// handling form submission, and accessing validation errors
const {
register,
handleSubmit,
formState: { errors },
} = useForm();


// State to track whether the user is logging in or signing up
const [action, setAction] = useState("login");


// Function that runs when the form is submitted successfully
const onSubmit = async (data) => {
try {
// If action is login, call login API
if(action == "login"){
const Response = await loginUser(data);
}else{
// Otherwise, call signup (add user) API
const Response = await addUser(data);
}
} catch(error){
// Catch and log any errors during API calls
console.error("error: ", error);
}
};


return (
<><center>
{/* Display heading based on current action */}
<h2>{action == "login" ? "Login" : "Sign Up"}</h2>


{/* Form submission handled by react-hook-form */}
<form className="App" onSubmit={handleSubmit(onSubmit)}>
{/* Username input field */}
<input
type="text"
{...register("username", { required: true })} // Register username with required validation
placeholder="Username"
/>
{/* Show error message if username validation fails */}
{errors.username && <span style={{ color: "red" }}>*Username* is mandatory</span>}<br></br><br></br>


{/* Password input field */}
<input
type="password"
{...register("password", { required: true })} // Register password with required validation
placeholder="Password"
/>
{/* Show error message if password validation fails */}
{errors.password && <span style={{ color: "red" }}>*Password* is mandatory</span>}<br></br><br></br>


{/* Login button sets action to login and submits form */}
<button type="submit" onClick={() => setAction("login")}>login</button>
{/* Signup button sets action to signup and submits form */}
<button type="submit" onClick={() => setAction("signup")}>Sign Up</button>
</form>
</center>
</>
);
}


export default Login; // Export Login component for use in other parts of the app