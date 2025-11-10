// src/pages/Home.jsx (MODIFIÉ)
import * as Atomize from "atomize"; // Importation globale sous l'alias Atomize

const events = [
  // ... (Vos données d'événements restent ici)
];

export default function Home() {
  return (
    <Atomize.Div p={{ x: "2rem", y: "3rem" }}>
      <Atomize.Text textSize="heading" m={{ b: "2rem" }} textAlign="center" textColor="info800">
        Bienvenue sur TicketPlatform 🎉
      </Atomize.Text>

      <Atomize.Row>
        {events.map((event) => (
          <Atomize.Col key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Atomize.Card m="1rem" hoverShadow="3">
              <Atomize.Image src={event.image} h="200px" w="100%" rounded="lg" />
              <Atomize.Div p="1rem">
                <Atomize.Text textSize="subheader" m={{ b: "0.5rem" }}>
                  {event.title}
                </Atomize.Text>
                <Atomize.Text m={{ b: "0.5rem" }}>{event.date}</Atomize.Text>
                <Atomize.Text m={{ b: "0.5rem" }} textColor="success700">
                  {event.price}
                </Atomize.Text>
                <Atomize.Button bg="info700" hoverBg="info800" textColor="white" rounded="circle">
                  Voir détails
                </Atomize.Button>
              </Atomize.Div>
            </Atomize.Card>
          </Atomize.Col>
        ))}
      </Atomize.Row>
    </Atomize.Div>
  );
}