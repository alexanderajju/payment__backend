// const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HQ4qtHt0wcdFhOshSiHumZlOPea7uSYDiuJCMD7yniLdg6cEROOnymZvwEDPfvXW9rR6kDbgmuk9bStlnOIVexZ00T8MNtDOE"
);
const port = process.env.PORT || 3000;

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "inr",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
// exports.api = functions.https.onRequest(app);
app.listen(port, () => {
  console.log("server started");
});
