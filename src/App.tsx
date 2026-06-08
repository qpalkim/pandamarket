import Router from "@/router/Router";
import GuestHeader from "@/components/Header/GuestHeader";
import Footer from "@/components/Footer/Footer";
import styles from "./App.module.scss";

export default function App() {
  return (
    <div className={styles.layout}>
      <GuestHeader />
      <main className={styles.main}>
        <Router />
      </main>
      <Footer />
    </div>
  )
}
