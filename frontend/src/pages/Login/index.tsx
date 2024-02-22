import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext.tsx";
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom";
import * as yup from "yup"

import { useForm, SubmitHandler } from "react-hook-form";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

interface ILoginInput {
  email: string;
  password: string;

}
export const Login = () => {
  const auth = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver: yupResolver(schema)});

  const navigate = useNavigate();

  const onSubmit = async (data: ILoginInput) => {
    const { email, password } = data;
    if (email && password) {
      const isLogged = await auth.signIn(email, password); // chamando função require (auth) [que vem do AuthContext], que chama o customhook api pra fazer a requisição no db
      if (isLogged) {
        navigate("/private");
      } else {
        alert("Email ou senha incorretos");
      }
    }
  };
  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Email"
          {...register("email", { required: true, maxLength: 50 })}
        />
        <p className="text-main-purple">{errors.email?.message}</p>
        <input
          type="password"
          placeholder="Senha"
          {...register("password", {
            required: true,
            maxLength: 20,
            minLength: 8,
          })}
        />
        <p>{errors.password?.message}</p>

       {/*  {errors.email && errors.password && <span>This field is required</span>} */}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};
