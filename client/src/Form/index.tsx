import { Field, Form, Formik } from "formik"
import { Items } from "~/App"

interface FormListProp {
  initialValues: Items
  submit: (value: Items) => void
}

export const FormList: React.FC<FormListProp> = ({ initialValues, submit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        submit(values)
        resetForm()
      }}
    >
      <Form>
        <Field
          id="user_email"
          type="email"
          name="user_email"
          placeholder="User email"
        />
        <Field id="title" name="title" placeholder="Title" />
        <Field id="progress" name="progress" placeholder="Progress" />
        <Field id="date" name="date" placeholder="Date" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}
