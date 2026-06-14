import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("App render failed", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="app-fallback">
          <section className="empty-state">
            <p className="app-kicker">Laufzeitfehler</p>
            <h1>Der Editor konnte nicht gerendert werden.</h1>
            <p>
              Lade die Seite neu. Wenn der Fehler bleibt, loesche den lokalen
              Browser-Speicher fuer dieses Projekt.
            </p>
            <button type="button" onClick={() => window.location.reload()}>
              Neu laden
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
