import { Field, Form, Formik } from "formik"
import { useCallback, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import "./App.css"
import Auth from "./Auth"

export interface Items {
  id: string
  user_email: string
  title: string
  progress: number
  date: string
}

const App = () => {
  const [cookie] = useCookies(undefined)
  const [item, setItem] = useState<Items[] | null>(null)
  const [editItem, setEditItem] = useState<Items | null>(null)
  const initialValues: Items = {
    id: editItem?.id || "",
    user_email: editItem?.user_email || cookie.Email,
    title: editItem?.title || "",
    progress: editItem?.progress || 0,
    date: editItem?.date || "",
  }

  const getData = useCallback(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVERURL}/list/${cookie.Email}`
      )
      const json = await res.json()
      setItem(json)
    } catch (err) {
      console.error(err)
    }
  }, [cookie.Email])

  useEffect(() => {
    if (cookie.AuthToken) {
      getData()
    }
  }, [cookie.AuthToken, getData])

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

  const signout = async () => {
    const removeCookies = (name: string) => {
      document.cookie =
        name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
    removeCookies("Email")
    removeCookies("AuthToken")
    window.location.reload()
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
      <div style={{ display: "flex" }} key={`item_${item.id}`}>
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
      {cookie.AuthToken ? (
        <>
          <button onClick={() => signout()}>Sign out </button>
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
      ) : (
        <Auth />
      )}
    </div>
  )
}

export default App
