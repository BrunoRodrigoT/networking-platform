import * as Yup from "yup";
import { validarCPF } from "@utils/validations";

Yup.addMethod(Yup.string, "cpfValid", function () {
  return this.test("cpf_valid", "CPF Inválido.", (value) => {
    if (!value) {
      return false; // or return true to make it optional
    }
    return validarCPF(value);
  });
});

export default Yup;
