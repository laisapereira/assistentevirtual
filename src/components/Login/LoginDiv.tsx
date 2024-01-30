import React from 'react';
import "./Login.css";


import joLogo from "../../assets/jo-logo.svg";
import emoji from "../../assets/emoji.png";

const Login = () => {
    return (
        <div className="main-container custom-height">

            <div className="login-screen w-full max-w-6x1 flex items-start rounded-lg justify-start">

                <div className="aside-left jo-content flex flex-col gap-y-20">
                    <div className="img-logo ">
                        <img src={joLogo} alt="" className='w-56 h-14'/>
                    </div>

                    <section className='flex flex-col gap-y-6 ml-[1.8rem]'>
                        <div className="h1-and-img flex items-center">
                            <h1 className='text-5xl text-start w-[31%] leading-[3.8rem]'>Descubra Aqui! </h1>
                            <img src={emoji} alt="emoji" className='w-16 pt-14'/>
                        </div>
                        <div className="">
                            <p className='text-lg font-thin text-start w-[86%]'>
                                A Jô, nossa assistente virtual,
                                tem um jeitinho todo especial
                                de se expressar:
                                ela adora interagir com emojis!
                                Ao simplificar buscas e fornecer
                                informações sobre a fundação,
                                a Jô também se torna além de eficientes,
                                mas também divertida e amigável para você.
                            </p>
                        </div>
                    </section>


                    <div className="o resto é contigo">
                        <img></img>
                        <p></p>
                    </div>
                            
                </div>




                


                <div className="aside-login">
                    <h1 className="text-black"></h1>
                    <h1 className='text-black'>Fazer Login</h1>
                </div>
            </div>
        </div>
        
    );
};



export default Login;
