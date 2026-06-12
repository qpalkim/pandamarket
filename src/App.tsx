import Router from "@/router/Router";
import Footer from "@/components/Footer/Footer";
import styles from "./App.module.scss";
import Header from "@/components/Header/Header";

export default function App() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Router />
      </main>
      <Footer />
    </div>
  );
}
