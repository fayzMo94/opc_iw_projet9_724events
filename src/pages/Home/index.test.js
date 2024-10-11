import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);

      // Le formulaire est rempli avec des données valides
      fireEvent.change(screen.getByLabelText("Nom"), {
        target: { value: "Jean" },
      });
      fireEvent.change(screen.getByLabelText("Prénom"), {
        target: { value: "Jean" },
      });
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "jean@example.com" },
      });
      fireEvent.change(screen.getByLabelText("Message"), {
        target: { value: "Bonjour" },
      });

      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // {timeOut} laisse le temps au message de s'afficher
      await screen.findByText("En cours", {}, { timeout: 2000 });
      await screen.findByText("Message envoyé !", {}, { timeout: 2000 });
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // to implement
  });
  it("a list a people is displayed", () => {
    // to implement
  });
  it("a footer is displayed", () => {
    // to implement
  });
  it("an event card, with the last event, is displayed", () => {
    // to implement
  });
});
