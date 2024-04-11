import { useState } from "react";
import { useHistory } from "react-router-dom"; //hooks

function Register(props) {
    const history = useHistory(); 
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({
        nameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: ""
    });


    const changeData = (e) => {
        const { name, value } = e.target;
        let updatedUserData = { ...userData };
    
        if (name === "name") {
            updatedUserData.name = value;
            setErrors({
                ...errors,
                nameError: value.length === 0 ? "required" : value.length < 3 && "Please enter a valid name",
                positionError: ""
            });
        } else if (name === "email") {
            updatedUserData.email = value;
            setErrors({
                ...errors,
                emailError: value.length === 0 ? "required" : !/\S+@\S+\.\S+/.test(value) && "Please enter a valid email address"
            });
        } else if (name === "password") {
            updatedUserData.password = value;
            setErrors({
                ...errors,
                passwordError: value.length === 0 ? " required" : "",
                confirmPasswordError: value !== userData.confirmPassword ? "not match" : ""
            });
        } else if (name === "confirmPassword") {
            updatedUserData.confirmPassword = value;
            setErrors({
                ...errors,
                confirmPasswordError: value !== userData.password ? "not match" : ""
            });
        }
    
        setUserData(updatedUserData);
    };
    const submitData = (e) => {
        
        e.preventDefault();
        // props.history.push('/');  //class
        history.push('/');
        console.log("Data is submitted");
    };

    return (
        <>        


<h1>User register</h1>
            <form onSubmit={(e) => submitData(e)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Name:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.nameError ? "border-danger" : "border-success"}`}
                        value={userData.name}
                        onChange={(e) => changeData(e)}
                        name="name"
                        id="exampleInputName"
                    />
                    <p className="text-danger">{errors.nameError}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail" className="form-label">Email:</label>
                    <input
                        type="email"
                        className={`form-control ${errors.emailError ? "border-danger" : "border-success"}`}
                        value={userData.email}
                        onChange={(e) => changeData(e)}
                        name="email"
                        id="exampleInputEmail"
                    />
                    <p className="text-danger">{errors.emailError}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword" className="form-label">Password:</label>
                    <input
                        type="password"
                        className={`form-control ${errors.passwordError ? "border-danger" : "border-success"}`}
                        value={userData.password}
                        onChange={(e) => changeData(e)}
                        name="password"
                        id="exampleInputPassword"
                    />
                    <p className="text-danger">{errors.passwordError}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputConfirmPassword" className="form-label">Confirm Password:</label>
                    <input
                        type="password"
                        className={`form-control ${errors.confirmPasswordError ? "border-danger" : "border-success"}`}
                        value={userData.confirmPassword}
                        onChange={(e) => changeData(e)}
                        name="confirmPassword"
                        id="exampleInputConfirmPassword"
                    />
                    <p className="text-danger">{errors.confirmPasswordError}</p>
                </div>
                <button
                    disabled={errors.nameError || errors.emailError || errors.passwordError || errors.confirmPasswordError}
                    type="submit"
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </form>
        </>
    );
}

export default Register;
