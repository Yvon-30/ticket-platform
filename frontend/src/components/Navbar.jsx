// src/components/Navbar.jsx (CORRECTION DE NAVIGATION)
import * as Atomize from "atomize";
import { Link } from "react-router-dom"; // L'importation de Link reste

export default function Navbar() {
  // Styles Atomize pour les liens, pour simuler l'Anchor
  const linkStyle = {
    textColor: "white",
    hoverTextColor: "warning300",
    textDecoration: "none", // Pour enlever le soulignement par défaut
    fontSize: "subheader" // Optionnel: pour simuler la taille de l'Anchor
  };

  return (
    <Atomize.Div 
      d="flex"
      justify="space-between"
      align="center"
      p={{ x: "2rem", y: "1rem" }}
      bg="info700"
      shadow="2"
    >
      <Atomize.Text textColor="white" textSize="heading" fontWeight="600">
        🎟️ TicketPlatform
      </Atomize.Text>

      <Atomize.Div d="flex" gap="2rem">
        
        {/* Remplacer Atomize.Anchor par Link natif encapsulant Atomize.Text */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Atomize.Text {...linkStyle}>Accueil</Atomize.Text>
        </Link>
        
        <Link to="/events" style={{ textDecoration: 'none' }}>
          <Atomize.Text {...linkStyle}>Événements</Atomize.Text>
        </Link>
        
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Atomize.Text {...linkStyle}>Connexion</Atomize.Text>
        </Link>

      </Atomize.Div>
    </Atomize.Div>
  );
}