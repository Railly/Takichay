import * as yup from "yup";

function checkIfFilesAreCorrectType(file) {
  if (!file.length) return false;
  return ["image/jpeg", "image/png", "image/jpg"].includes(file[0].type);
}

function checkIfSongsAreCorrectType(file) {
  if (!file.length) return false;
  return ["audio/mpeg"].includes(file[0].type);
}

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});

export const songSchema = yup.object().shape({
  name: yup.string().required("El nombre de usuario es requerido"),
  description: yup.string().required("La descripción es requerida"),
  genre: yup.string().required("Falto ingresar un genero"),
  file: yup
    .mixed()
    .test("type", "Debe ser una imagen", checkIfFilesAreCorrectType),
  song: yup
    .mixed()
    .test("type", "Debe ser una cancion", checkIfSongsAreCorrectType),
});

export const perfilSchema = yup.object().shape({
  description: yup.string(),
  file: yup
    .mixed()
    .test(
      "type",
      "Debe ser un archivo tipo jpg, jpeg o png",
      checkIfFilesAreCorrectType
    ),
  password: yup
    .string()
    .matches(/^(?=.*[0-9])/, "La contraseña debe contener al menos un número")
    .matches(
      /^(?=.*[a-z])/,
      "La contraseña debe contener al menos una letra minúscula"
    )
    .matches(
      /^(?=.*[A-Z])/,
      "La contraseña debe contener al menos una letra mayúscula"
    )
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const registerSchema = yup.object().shape({
  name: yup.string().required("Nombre es un campo requerido"),
  email: yup
    .string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es requerido"),
  password: yup
    .string()
    .matches(/^(?=.*[0-9])/, "La contraseña debe contener al menos un número")
    .matches(
      /^(?=.*[a-z])/,
      "La contraseña debe contener al menos una letra minúscula"
    )
    .matches(
      /^(?=.*[A-Z])/,
      "La contraseña debe contener al menos una letra mayúscula"
    )
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required(),
});
