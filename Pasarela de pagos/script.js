// Inicializa Stripe con tu clave pública
const stripe = Stripe("pk_test_51Q2e84JNhcOyjHY7nV7hDdsfH9fYnKROBRZljZStMNxWVQAIAtQUzo2iinfLy4siT546wkTArfmOenwUCnnup8ZZ00bVbRr0Uc");

// Manejador para el botón de pago
document.getElementById("checkout-button").addEventListener("click", function () {
  fetch("http://localhost:3000/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
  
  .then((response) => response.json())
  .then((data) => {
    return stripe.redirectToCheckout({ sessionId: data.id });
})

  .then((result) => {
    if (result.error) {
      alert(result.error.message);
    }
  })
  .catch((error) => console.error("Error:", error));
});
