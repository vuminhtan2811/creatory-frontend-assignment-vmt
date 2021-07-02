import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../provider/auth";
import { useRouter } from "../../provider/routers";
import Loader from "../../containers/common/loading";

import "./index.css";

function Login() {
  const [loading, setLoading] = useState(false);
  const { history, push } = useRouter();
  const { signin, authenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    signin(data).then((res) => {
      push("/");
    })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(()=>{
    if(authenticated){
      push("/");
    }
  },[authenticated, history, push])

  return (
    <>
      {loading && <Loader />}
      <div className="login-wrapper">
        <h3 className="title-login-form">Login To Web App</h3>
        <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
          <input
            className={`form-control ${errors["username"]?.type && "is-error"}`}
            type="text"
            name="username"
            placeholder="Enter username..."
            control={control}
            {...register("username", {
              required: "Username is required!",
            })}
          />
          <span className={`message ${errors["username"]?.type && "is-error"}`}>
            {errors["username"]?.message}
          </span>
          <input
            className={`form-control ${errors["password"]?.type && "is-error"}`}
            type="password"
            name="password"
            placeholder="Enter password..."
            control={control}
            {...register("password", {
              required: "Password is required!",
            })}
          />
          <span className={`message ${errors["password"]?.type && "is-error"}`}>
            {errors["password"]?.message}
          </span>
          <button className="btn login" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
export default Login;
