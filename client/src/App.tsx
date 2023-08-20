import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import "./App.css"

export interface Items {
  id: string
  user_email: string
  title: string
  progress: number
  date: string
}

const App = () => {
  const [item, setItem] = useState<Items[] | null>(null)
  const initialValues: Omit<Items, "id"> = {
    user_email: "",
    title: "",
    progress: 0,
    date: "",
  }

  const getData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/list`)
      console.log("resss", res)
      const json = await res.json()
      console.log("json", json)
      setItem(json)
      console.log(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const postData = async (values: Omit<Items, "id">) => {
    try {
      const res = await fetch(`http://localhost:8000/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      if (res.status === 200) {
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      {item?.map((item) => item.user_email)}
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          postData(values)
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
    </div>
  )
}

export default App
