import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext.tsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import joLogo from "../../public/logo.svg";

import emojiIcon from "../../public/emoji.png";

import { useForm, SubmitHandler } from "react-hook-form";

import "./login.css";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import { NumberOfRegistered } from "../../components/Header/NumberOfRegisteres.tsx";
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

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
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
    <div className="main-container h-[90vh]">
      <div className="login-screen">
        <section className="aside-left">
          <div className="jo-Logo">
            <img src={joLogo} alt="jo-logo"></img>
          </div>

          <div className="pl-9 pt-8 flex flex-col gap-7">
            <section className="flex gap-2">
              <h1 className=" font-montserrat font-bold text-main-white text-5xl text-start w-[31%] leading-[3.8rem]">
                Descubra Aqui!{" "}
              </h1>
              <img src={emojiIcon} alt="emoji" className="w-16 pt-14" />
            </section>

            <div>
              <p className=" text-main-white text-lg font-extralight text-start w-[86%]">
                A Jô, nossa assistente virtual, tem um jeitinho todo especial de
                se expressar: ela adora interagir com emojis! Ao simplificar
                buscas e fornecer informações sobre a fundação, a Jô se
                torna além de eficiente, mais divertida e amigável para
                você.
              </p>

              <NumberOfRegistered backgroundColor="white" />
            </div>
          </div>
        </section>

        <aside className="aside-login flex flex-col gap-36">
          <h1 className="text-center font-bold text-3xl font-montserrat text-black relative top-12">
            Fazer login
          </h1>

          <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-label">
              <label htmlFor="email">Endereço de email</label>
              <input
                type="text"
                {...register("email", { required: true, maxLength: 50 })}
              />
              <p className="text-main-pink">{errors.email?.message}</p>
            </div>

            <div className="input-label">
              <label htmlFor="Senha">Senha</label>

              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  max: 20,
                  min: 8,
                })}
              />
              <button
                className="absolute right-[25%] bottom-[42%]"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}{" "}
              </button>

              <p className="text-main-pink">{errors.password?.message}</p>
            </div>

            {/*  {errors.email && errors.password && <span>This field is required</span>} */}
            <div className="button-submit">
              <button type="submit">Entrar</button>
              <h3>
                Novo usuário?{" "}
                <a href="/register" className="text-sm text-main-pink" target="_blank">
                  Crie uma conta
                </a>
              </h3>
            </div>
          </form>
        </aside>
      </div>
    </div>
  );
};
