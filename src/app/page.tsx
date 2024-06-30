import Image from "next/image";
import styles from "./page.module.css";
import { Board } from "./components/Board";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Juego del TaTeTi</h1>
      <Board />
      <Footer />
    </main>
  );
}
