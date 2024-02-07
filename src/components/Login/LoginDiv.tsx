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
                        <img src={joLogo} alt="" className='w-56 h-14' />
                    </div>

                    <section className='flex flex-col gap-y-6 ml-[1.8rem]'>
                        <div className="h1-and-img flex items-center">
                            <h1 className='text-5xl text-start w-[31%] leading-[3.8rem]'>Descubra Aqui! </h1>
                            <img src={emoji} alt="emoji" className='w-16 pt-14' />
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

                </div>



                <section className="aside-login flex flex-col gap-36">
                    
                    <h1 className='text-black relative top-12'>Fazer Login</h1>
                    <form action="" className='login-email-password flex flex-col gap-10 items-center justify-center'>
                        <div className="email flex flex-col w-[60%]">
                            <label htmlFor="Email" className='text-black text-left'>Email</label>
                            <input className='text-lg text-black outline-none text-sm border-b-2 border-customBlue' type="text" name="" id="" placeholder='Exemplo: test@email.com' />
                        </div>
                        <div className="password flex flex-col w-[60%]">
                            <label htmlFor="Email" className='text-black text-left'>Senha</label>
                            <input className='text-lg text-black outline-none text-sm border-b-2 border-customBlue' type="password" name="" id="" placeholder='Escreva sua senha aqui...' />
                        </div>
                        <div className="button gap-36">
                            <button className='bg-black p-1.5 rounded-lg hover:bg-custom-black'><h1 className="text-white w-72">Entrar</h1></button>
                            <h3 className='text-black text-sm p-8'>Novo usuário? <a href="" className='text-sm text-customBlue' target='_blank'>Crie uma conta</a></h3>
                        </div>
                    </form>
                </section>
            </div>
        </div>

    );
};



export default Login;
