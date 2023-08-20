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

  const handleSubmit = async (values: AuthProps) => {
    console.log("value", values)
    try {
      const submitUser = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVERURL}/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      )
      const data = await submitUser.json()
      console.log("data", data)

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
  return (
    <>
      <h3>Sign up</h3>
      {error}
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values)
          resetForm()
        }}
      >
        <Form>
          <Field id="email" type="email" name="email" placeholder="Email" />
          <Field
            id="password"
            type="password"
            name="password"
            placeholder="Password"
          />
          <Field
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  )
}

export default Auth
