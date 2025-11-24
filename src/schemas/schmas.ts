import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .matches(/^[\x20-\x7E]+$/, "Email must use standard Latin characters")
    .email("This is not a valid email address")
    .required("Please enter your email"),
  password: Yup.string()
    .trim()
    .min(8)
    .max(60)
    .required("Please enter your password"),
});

export const RegisterSchema = Yup.object().shape({
  username: Yup.string().max(30)
    .trim().test("Not-latin-letters", "Username must contain standard Latin characters", value => !!value && /[A-Za-z]/.test(value))
    .matches(/[A-Za-z]/, "Username must contain at least one letter")
    .required("Please enter a username"),
  email: Yup.string()
    .trim()
    // .matches(/^[\x20-\x7E]+$/, "Email must use standard Latin characters")
    .test("not-numbers-only", "Username cannot be numbers only", value => !!value && /\D/.test(value))
    .email("This is not a valid email address")
    .required("Please enter your email"),
  password: Yup.string()
    .trim().test("no-spaces", "spaces are not allowed", value => !/\s/.test(value || ""))
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Please enter your password"),
});
