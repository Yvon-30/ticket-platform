// src/pages/Home.jsx
import { Div, Text, Button, Row, Col, Card, Image } from "atomize";

const events = [
  {
    id: 1,
    title: "Concert Gospel Night",
    date: "15 Nov 2025",
    price: "5000 FCFA",
    image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
  },
  {
    id: 2,
    title: "Conférence Tech Africa",
    date: "28 Nov 2025",
    price: "10000 FCFA",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
];

export default function Home() {
  return (
    <Div p={{ x: "2rem", y: "3rem" }}>
      <Text textSize="heading" m={{ b: "2rem" }} textAlign="center" textColor="info800">
        Bienvenue sur TicketPlatform 🎉
      </Text>

      <Row>
        {events.map((event) => (
          <Col key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card m="1rem" hoverShadow="3">
              <Image src={event.image} h="200px" w="100%" rounded="lg" />
              <Div p="1rem">
                <Text textSize="subheader" m={{ b: "0.5rem" }}>
                  {event.title}
                </Text>
                <Text m={{ b: "0.5rem" }}>{event.date}</Text>
                <Text m={{ b: "0.5rem" }} textColor="success700">
                  {event.price}
                </Text>
                <Button bg="info700" hoverBg="info800" textColor="white" rounded="circle">
                  Voir détails
                </Button>
              </Div>
            </Card>
          </Col>
        ))}
      </Row>
    </Div>
  );
}
