// src/components/Navbar.jsx
import { Div, Text, Anchor } from "atomize";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Div
      d="flex"
      justify="space-between"
      align="center"
      p={{ x: "2rem", y: "1rem" }}
      bg="info700"
      shadow="2"
    >
      <Text textColor="white" textSize="heading" fontWeight="600">
        🎟️ TicketPlatform
      </Text>

      <Div d="flex" gap="2rem">
        <Anchor tag={Link} to="/" textColor="white" hoverTextColor="warning300">
          Accueil
        </Anchor>
        <Anchor tag={Link} to="/events" textColor="white" hoverTextColor="warning300">
          Événements
        </Anchor>
        <Anchor tag={Link} to="/login" textColor="white" hoverTextColor="warning300">
          Connexion
        </Anchor>
      </Div>
    </Div>
  );
}
