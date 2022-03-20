import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Stack,
  Avatar,
  Input,
  InputAdornment,
  Typography,
  IconButton,
  FormControlLabel,
  Checkbox
  ,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import InputWrapper from "../../components/InputWrapper";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm, Controller } from "react-hook-form";
import { EMAIL_REGEX } from "../../helpers";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import { loginApi } from "../../api";

const Login = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    defaultValues: {
      email: '',
      password: '',
      type: "EMPLOYEE"
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = (data) => {
    setLoading(true);
    loginApi(data, (res) => {
      setLoading(false);
      if(res.data) {
        localStorage.setItem('token', res.data?.result?.token);
      }
      else {
        console.log("loginApi error");
        setError("Incorrect email or password");
      }
    })
  };
  return (
    <Container
      style={{
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ padding: 4, minWidth: 300 }}>
        <CardContent>
          <Stack direction="column" spacing={8}>
            <Avatar
              style={{ backgroundColor: "lightgreen", alignSelf: "center" }}
              variant="rounded"
            >
              <EmailIcon />
            </Avatar>
            <Stack direction="column" spacing={5}>
              <InputWrapper error={errors?.email?.message}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { ref, onChange, ...rest } }) => (
                    <Input
                      onChange={(e) => {
                        setError("");
                        onChange(e);
                      }}
                      {...rest}
                      error={errors?.email}
                      type="text"
                      placeholder="Enter Your Email"
                      startAdornment={
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      }
                    />
                  )}
                  rules={{
                    required: { value: true, message: "Required" },
                    pattern: { value: EMAIL_REGEX, message: "Invalid Email" },
                  }}
                />
              </InputWrapper>

              <InputWrapper error={errors?.password?.message}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { ref, onChange, ...rest } }) => (
                    <Input
                      onChange={(e) => {
                        setError("");
                        onChange(e);
                      }}
                      {...rest}
                      error={errors?.password}
                      placeholder="Enter Your Password"
                      type={showPassword ? "text" : "password"}
                      startAdornment={
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                  rules={{
                    required: { value: true, message: "Required" },
                    minLength: { value: 8, message: "Length should be 8-20" },
                    maxLength: { value: 20, message: "Length should be 8-20" },
                  }}
                />
              </InputWrapper>

              <Controller
                name="type"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    control={<Checkbox
                      checked={value === "ADMIN"}
                      onChange={(e) => setValue('type', e.target.checked ? "ADMIN" : "EMPLOYEE")}
                    />}
                    label="Login as Admin"
                  />
                )}
              />

            </Stack>
            {error && (
              <Typography
                sx={{
                  fontSize: "12px",
                  marginBottom: 0,
                  marginTop: 1,
                  color: "#e55353",
                }}
                className="error"
              >
                {error}
              </Typography>
            )}

            <LoadingButton
              loading={loading}
              style={{ marginTop: "50px" }}
              variant="contained"
              onClick={handleSubmit(handleLogin)}
            >
              Login
            </LoadingButton>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
