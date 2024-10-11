import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Form is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

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
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      await waitFor(() => screen.getByText("En cours"), { timeout: 2000 });
      await waitFor(() => screen.getByText("Envoyer"), { timeout: 2000 });

      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
