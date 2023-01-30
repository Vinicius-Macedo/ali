import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  const [isSending, setIsSending] = React.useState(false);
  const [formFields, setFormFields] = React.useState({
    user: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    switch (name) {
      case "user":
        if (value.length > 0) {
          event.target.classList.add("has-value");
        } else {
          event.target.classList.remove("has-value");
        }
        break;
      case "password":
        if (value.length > 0) {
          event.target.classList.add("has-value");
        } else {
          event.target.classList.remove("has-value");
        }
        break;
      default:
        break;
    }

    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    console.log("submit");
  }

  return (
    <>
      <section className="bg-dark w-screen h-screen relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-24 py-32 rounded w-full max-w-[400px]">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-16 items-center"
            noValidate
          >
            <div className="relative">
              <h1 className="font-ubuntu text-white text-center text-[36px]">
                Seja bem vindo
              </h1>
              <span className="text-white-grey absolute -top-6 left-1/2 -translate-x-1/2 text-center w-full">
                Digite seu login e senha
              </span>
            </div>
            <div className="flex flex-col items-center w-full">
              <div className="login-input-container w-full">
                <input
                  className="input-field"
                  type="text"
                  id="user"
                  name="user"
                  onChange={(e) => handleChange(e)}
                  required
                />
                <label className="label-field" htmlFor="user">
                  login
                </label>
                <span className="decoration"></span>
              </div>
              <div className="login-input-container w-full">
                <input
                  className="input-field"
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  required
                />
                <label className="label-field" htmlFor="password">
                  senha
                </label>
                <span className="decoration"></span>
                <Link className="forget-password" to={"/"}>Esqueceu a senha?</Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full items-center">
              <button
                className="text-[18px] text-white bg-blue hover:bg-blue-dark py-4 rounded-sm font-semibold w-full"
                type="submit"
              >
                entrar
              </button>
              <div>
                
              </div>
              <Link
                className="text-white-grey text-center text-[14px] p-4 hover:text-blue active:text-white"
                to={"/registro"}
              >
                Criar minha conta
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
