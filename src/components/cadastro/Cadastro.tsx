import React from 'react';
import "./Cadastro.css";


import joLogo from "../../assets/jo-logo.svg";
import emoji from "../../assets/emoji.png";

const Login = () => {
    return (
        <div className="main-container h-screen">

            <div className="login-screen w-full max-w-6x1 flex items-start rounded-lg justify-start">

                <div className="bg-black aside-left jo-content flex gap-y-20">
                    <div className="img-logo ">
                        <img src={joLogo} alt="" className='w-56 h-14' />
                    </div>

                    <div className="text-cadastro w-full text-center">
                        <h1>Cadastre-se</h1>
                    </div>

                    <div className="dados-cadastro w-full flex">
                        <div className="dados-left w-1/2 bg-white">

                        </div>
                        <div className="dados-right w-1/2 bg-black">

                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};



export default Login;
