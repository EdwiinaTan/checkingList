import { Field, Form, Formik } from "formik"
import { useState } from "react"
import { useCookies } from "react-cookie"

export interface AuthProps {
  email: string
  password: string
  confirmPassword: string
}

const Auth = () => {
  const [error, setError] = useState(null)
  const [cookie, setCookie] = useCookies(undefined)
  const initialValues: AuthProps = {
    email: "",
    password: "",
    confirmPassword: "",
  }

  console.log("cookie", cookie)

  const signUpUser = async (values: Omit<AuthProps, "confirmPassword">) => {
    try {
      const signup = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVERURL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      )

      const data = await signup.json()
      if (signup.status === 400) {
        setError(data.message)
        return
      }
      if (data.detail) {
        setError(data.detail)
      } else {
        setCookie("Email", data.email)
        setCookie("AuthToken", data.token)
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const loginUser = async (values: Omit<AuthProps, "confirmPassword">) => {
    try {
      const login = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVERURL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      )
      const data = await login.json()
      if (login.status === 400) {
        setError(data.message)
        return
      } else {
        setCookie("Email", data.email)
        setCookie("AuthToken", data.token)
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h3>Sign up</h3>
      {error}
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          signUpUser(values)
          resetForm()
        }}
      >
        <Form>
          <Field
            id="emailSignUp"
            type="email"
            name="email"
            placeholder="Email"
          />
          <Field
            id="passwordSignUp"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="on"
          />
          <Field
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            autoComplete="on"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <h3>Login</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          loginUser(values)
          resetForm()
        }}
      >
        <Form>
          <Field
            id="emailLogin"
            type="email"
            name="email"
            placeholder="Email"
          />
          <Field
            id="passwordLogin"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="on"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  )
}

export default Auth
