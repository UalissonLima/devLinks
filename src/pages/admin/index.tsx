import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FiTrash } from "react-icons/fi";
import { db } from "../../ConfigFirebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

interface DataProps {
  id: string; // Adicionando 'id' aqui para armazenar o ID do documento
  nome: string;
  url: string;
  bgColor: string;
  txtColor: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [bgColorInput, setBgColorInput] = useState("#121212");
  const [dataLinks, setDataLinks] = useState<DataProps[]>([]);

  const resetForm = () => {
    setNameInput("");
    setUrlInput("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const q = query(collection(db, "links"), orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);
    const itensArray: DataProps[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id, // Certificando-se de que estamos mapeando o ID do documento
          nome: doc.data().nome,
          url: doc.data().url,
          bgColor: doc.data().bgColor,
          txtColor: doc.data().txtColor,
        } as DataProps)
    ); // Assegurando que estamos mapeando para DataProps
    setDataLinks(itensArray);
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    const nome = nameInput.trim();
    const url = urlInput.trim();
    if (nome !== "" && url !== "") {
      await addDoc(collection(db, "links"), {
        nome: nome,
        url: url,
        bgColor: bgColorInput,
        txtColor: textColorInput,
        createdAt: Timestamp.now(),
      })
        .then(() => {
          resetForm();
          fetchData();
          mostrarToast();
        })
        .catch((error) => {
          console.log(error.code);
        });
    } else {
      alert("Preencha todos os campos. Tente novamente!");
    }
  }

  async function excludeLink(id: string) {
    const linkDoc = doc(db, "links", id);
    await deleteDoc(linkDoc);
    fetchData();
  }

  function mostrarToast() {
    toast.success("Cadastrado com sucesso", {
      autoClose: 2000,
      closeOnClick: true,
      position: "top-right",
    });
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb7 px-2">
      <Header />
      <form
        onSubmit={handleRegister}
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
      >
        <label htmlFor="" className="text-white font-medium mt-2 mb-2">
          Nome do link
        </label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label htmlFor="" className="text-white font-medium mt-2 mb-2">
          Url do link
        </label>
        <Input
          placeholder="Digite a url..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <section className="flex my-4 gap-5 items-center">
          <div className="flex gap-2">
            <label htmlFor="" className="text-white font-medium mt-2 mb-2">
              Cor do link
            </label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="" className="text-white font-medium mt-2 mb-2">
              Fundo do link
            </label>
            <input
              type="color"
              value={bgColorInput}
              onChange={(e) => setBgColorInput(e.target.value)}
            />
          </div>
        </section>
        {nameInput !== "" && (
          <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label htmlFor="" className="text-white font-medium mt-2 mb-3">
              Veja como está ficando:
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: bgColorInput,
              }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 h-9 rounded-md text-white gap-4 font-medium flex justify-center items-center"
        >
          Cadastrar
        </button>
      </form>
      <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>
      {dataLinks.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{
            backgroundColor: link.bgColor, // Usando bgColor do objeto
            color: link.txtColor, // Usando txtColor do objeto
          }}
        >
          <p>{link.nome}</p>
          <div>
            <button
              className="border border-dashed p-1 rounded"
              onClick={() => excludeLink(link.id)}
            >
              <FiTrash size={18} color="#FFF" />
            </button>
          </div>
        </article>
      ))}
      <ToastContainer></ToastContainer>
    </div>
  );
}
