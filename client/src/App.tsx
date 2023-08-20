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
  const [editItem, setEditItem] = useState<Items | null>(null)
  const initialValues: Items = {
    id: editItem?.id || "",
    user_email: editItem?.user_email || "",
    title: editItem?.title || "",
    progress: editItem?.progress || 0,
    date: editItem?.date || "",
  }

  const getData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVERURL}/list`
      )
      const json = await res.json()
      setItem(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getData()
  })

  const postData = async (values: Omit<Items, "id">) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVERURL}/list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      )
      if (res.status === 200) {
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const editData = async (values: Items) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVERURL}/list/${values.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      )
      if (res.status === 200) {
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const deleteData = async (id: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVERURL}/list/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (res.status === 200) {
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const renderItems = () => {
    return item?.map((item) => (
      <div style={{ display: "flex" }} key={`items_${item.id}`}>
        <span>
          {item.user_email} {item.title}
        </span>
        <span onClick={() => setEditItem(item)}>&nbsp; EDIT</span>
        <span onClick={() => deleteData(item.id)}>&nbsp; DELETE</span>
      </div>
    ))
  }

  return (
    <div>
      <>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={(values, { resetForm }) => {
            editItem ? editData(values) : postData(values)
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
        {renderItems()}
      </>
    </div>
  )
}

export default App
