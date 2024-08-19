import { Social } from "../../components/social";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Header } from "../../components/header";
import { getDocs, getDoc, collection, doc } from "firebase/firestore";
import { db } from "../../ConfigFirebase";
import { useEffect, useState } from "react";

interface LinksProps {
  id: string;
  nome: string;
  bgColor: string;
  txtColor: string;
  url: string;
}

type URLSocialProps = { youtube: string; facebook: string; instagram: string };

export function Home() {
  const [links, setLinks] = useState<LinksProps[]>([]);
  const [social, setSocial] = useState<URLSocialProps | null>(null); // Mudou para um objeto ou null

  useEffect(() => {
    linksData();
    socialData(); // Chamar socialData aqui para buscar os dados sociais
  }, []);

  async function linksData() {
    const linksRef = collection(db, "links");
    const querySnapshot = await getDocs(linksRef);

    const listaLinks: LinksProps[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          nome: doc.data().nome,
          url: doc.data().url,
          bgColor: doc.data().bgColor,
          txtColor: doc.data().txtColor,
        } as LinksProps)
    );

    setLinks(listaLinks);
    console.log(listaLinks); // Corrigido para mostrar a lista de links
  }

  async function socialData() {
    const socialRef = doc(db, "social", "link");
    const snapshot = await getDoc(socialRef);

    if (snapshot.exists()) {
      setSocial({
        youtube: snapshot.data()?.youtube || "",
        facebook: snapshot.data()?.facebook || "",
        instagram: snapshot.data()?.instagram || "",
      });
    }
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb7 px-2">
      <Header />
      <div className="flex flex-col w-full py-4 items-center justify-center">
        <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
          Ualisson Lima
        </h1>

        <span className="text-gray-50 mb-5 mt-3">Veja meus links👇</span>

        <main className="flex flex-col w-11/12 max-w-xl text-center">
          {links.map((link) => (
            <section
              key={link.id} // Adicione uma key única para cada item
              className="mb-4 w-full py-2 rounded-lg select-none cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: link.bgColor, color: link.txtColor }}
            >
              <a href={link.url} target="_blank">
                <p className="md:text-lg text-base">{link.nome}</p>
              </a>
            </section>
          ))}

          <footer className="flex justify-center gap-3 my-4">
            {social && (
              <>
                <Social url={social.youtube}>
                  <FaYoutube size={35} color="#FFF" />
                </Social>
                <Social url={social.facebook}>
                  <FaFacebook size={35} color="#FFF" />
                </Social>
                <Social url={social.instagram}>
                  <FaInstagram size={35} color="#FFF" />
                </Social>
              </>
            )}
          </footer>
        </main>
      </div>
    </div>
  );
}
