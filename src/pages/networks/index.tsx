import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { db } from "../../ConfigFirebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export function Networks() {
  const [fb, setFb] = useState("");
  const [ig, setIg] = useState("");
  const [yt, setYt] = useState("");

  useEffect(() => {
    fetchDados();
  }, []);

  async function fetchDados() {
    const docRef = doc(db, "social", "link");
    getDoc(docRef).then((snapshot) => {
      if (snapshot.data() !== undefined) {
        setFb(snapshot.data()?.facebook);
        setIg(snapshot.data()?.instagram);
        setYt(snapshot.data()?.youtube);
      }
    });
  }

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    setDoc(doc(db, "social", "link"), {
      facebook: fb,
      instagram: ig,
      youtube: yt,
    });
    mostrarToast();
  }

  function mostrarToast() {
    toast.success("Salvo com sucesso", {
      autoClose: 2000,
      closeOnClick: true,
      position: "top-right",
    });
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb7 px-2">
      <Header></Header>
      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        Minha redes sociais
      </h1>
      <form
        action=""
        className="flex flex-col max-w-xl w-full"
        onSubmit={handleRegister}
      >
        <label htmlFor="" className="text-white font-medium mt-2 mb-2">
          Link do Facebook
        </label>
        <Input
          type="url"
          placeholder="Digite a url do seu facebook..."
          value={fb}
          onChange={(e) => setFb(e.target.value)}
        ></Input>
        <label htmlFor="" className="text-white font-medium mt-2 mb-2">
          Link do Instagram
        </label>
        <Input
          type="url"
          placeholder="Digite a url do seu instagram..."
          value={ig}
          onChange={(e) => setIg(e.target.value)}
        ></Input>
        <label htmlFor="" className="text-white font-medium mt-2 mb-2">
          Link do YouTube
        </label>
        <Input
          type="url"
          placeholder="Digite a url do seu canal no youtube..."
          value={yt}
          onChange={(e) => setYt(e.target.value)}
        ></Input>
        <button
          type="submit"
          className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium"
        >
          Salvar Links
        </button>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
}
