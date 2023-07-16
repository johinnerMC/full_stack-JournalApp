import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth);

  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  //console.log(isCheckingAuthentication)

  const formData = {
    displayName: "",
    email: "",
    password: "",
  };

  const formValidations = {
    email: [(value) => value.includes("@"), "El correo debe de tener una @"],
    password: [
      (value) => value.length >= 6,
      "El password debe de tener 6 caracteres",
    ],
    displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
  };

  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    displayNameValid,
    emailValid,
    passwordValid,
    isFormValid,
  } = useForm(formData, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    console.log({isCheckingAuthentication, errorMessage, status})
    console.log(!!errorMessage)

    if (!isFormValid) return;

    dispatch(
      startCreatingUserWithEmailPassword({ email, password, displayName })
    );
  };

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted} // lo convierte en un valor buooleano
              helperText={formSubmitted ? displayNameValid : ""}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={formSubmitted ? emailValid : ""}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={formSubmitted ? passwordValid : ""}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
             <Grid item xs={12} display={!!errorMessage ? "": "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid> 
            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
