function MyButton() {
  return (
    <button >
      Je suis un bouton
    </button>
  );
}
function AboutPage() {
  return (
    <>
      <h1>À propos</h1>
      <p>Bien le bonjour.<br />Comment ça va ?</p>
    </>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Bienvenue dans mon appli</h1>
      <MyButton />
    </div>
  );

}
