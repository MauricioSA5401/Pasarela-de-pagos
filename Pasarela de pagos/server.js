const express = require("express");
const app = express();
//Aqui va la clave privada, se encuentra en repositorio claves
const stripe = require("stripe")("clavePrivadaNoSePuedeCompartir: Clave reservada en repositorio Claves");

app.use(express.static("."));
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "mxn",
          product_data: {
            name: "Producto de prueba",
          },
          unit_amount: 1000, // Monto en centavos (1000 = $10.00 MXN)
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success.html",
    cancel_url: "http://localhost:3000/cancel.html",
  });

  res.json({ id: session.id });
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
