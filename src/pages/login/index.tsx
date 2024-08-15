import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../ConfigFirebase";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Preencha email e senha!");
      return;
    }

    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        mostrarToast();
        resetInputs();
        navigate("/admin", { replace: true });
      })
      .catch((erro) => {
        alert(erro.code);
        resetInputs();
      });
  }

  function mostrarToast() {
    toast.success("Login bem sucedido", {
      autoClose: 2000,
      closeOnClick: true,
      position: "top-right",
    });
  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>
      <form
        action=""
        className="w-full max-w-xl flex flex-col px-1"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Digite o seu email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="*********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white"
        >
          Acessar
        </button>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
}
