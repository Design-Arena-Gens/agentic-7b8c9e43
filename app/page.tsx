import { ThemeToggle } from "../components/ThemeToggle";

export default function Page() {
  return (
    <main className="container">
      <div className="card">
        <h1>Dark Mode Toggle</h1>
        <p>Switch between light and dark themes instantly.</p>
        <ThemeToggle />
      </div>
    </main>
  );
}
