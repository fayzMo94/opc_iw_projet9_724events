import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      setErrorMessage("");

      const form = evt.target;
      const formData = new FormData(form);
      const values = Object.fromEntries(formData.entries());

      // Validate form inputs
      if (!values.nom || !values.prenom || !values.email || !values.message) {
        setErrorMessage("");
        setErrorMessage("Veuillez remplir tous les champs");
        setSending(false);
        return;
      }

      // Validate email format
      if (!values.email.includes("@")) {
        setErrorMessage("");
        setErrorMessage("Veuillez entrer une adresse email valide");
        setSending(false);
        return;
      }

      try {
        await mockContactApi();

        setSending(false);
        onSuccess();
        // appel de la fonction onSuccess() en cas de succès (le test 'expect' l'appel de cette fonction)
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" name="nom" />
          <Field placeholder="" label="Prénom" name="prenom" />
          <Select
            selection={["Personnel", "Entreprise"]}
            onChange={() => null}
            label="Personnel / Entreprise"
            type="large"
            titleEmpty
            name="selected"
          />
          <Field placeholder="" label="Email" name="email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            name="message"
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
