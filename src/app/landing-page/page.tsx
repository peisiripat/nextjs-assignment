import SignInForm from "./components/sign-in-form";

export default function LandingPage() {
  return (
    <div>
      <header>
        <h1>Teller System Login</h1>
      </header>
      <section className="mx-20 my-4">
        <SignInForm />
      </section>
    </div>
  );
}
