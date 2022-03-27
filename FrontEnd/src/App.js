import { useState, useEffect } from 'react'
import axios from 'axios'
import DateTimePicker from 'react-datetime-picker'
// CSS
import './App.css'





function App() {
  const [reminderMsg, setReminderMsg] = useState('')
  const [remindAt, setRemindAt] = useState()
  const [reminderList, setReminderList] = useState([])


  function loadData() {
    axios.get("http://localhost:9000/getAllReminder").then(res => setReminderList(res.data))
  }

  useEffect(() => {
    loadData()
  }, [])


  const addReminder = async () => {
    await axios.post('http://localhost:9000/addReminder', { remindAt, reminderMsg })
    setReminderMsg('')
    setRemindAt()
    setTimeout(() => loadData(), 1)
  }

  const deleteReminder = async (id) => {
    await axios.post('http://localhost:9000/deleteReminder', { id })
    setTimeout(() => loadData(), 1)
  }

  /* Baraye inke vaqti be data yechizi miferestim va mikhahim component refresh/reload beshe 
      aval dar function haye addReminder() va deleteReminder() az async await estefade kardam 
      va bad az setTimeout() */




  return (
    <div className="App">
      <div className="homepage">

        <div className="homepage_header">
          <h1>Remind Me 🙂</h1>
          <input
            type='text'
            placeholder='Reminder notes here...'
            className='form-control'
            value={reminderMsg}
            onChange={e => setReminderMsg(e.target.value)}
          />
          <DateTimePicker
            value={remindAt}
            onChange={setRemindAt}
            minDate={new Date()}
            minutePlaceholder='mm'
            hourPlaceholder='hh'
            dayPlaceholder='DD'
            monthPlaceholder='MM'
            yearPlaceholder='YY'
          />
          <button className='button' onClick={addReminder}>Add Reminder</button>
        </div>

        <center className="homepage_body">
          {reminderList.length !== '' &&
            reminderList.map(reminder => (
              <div className="reminder_card" key={reminder._id}>
                <h2>{reminder.reminderMsg}</h2>
                <h3>Remind Me at:</h3>
                <p>{String(new Date(reminder.remindAt))}</p>
                <section className="btn bg-danger w-100 text-light" onClick={() => deleteReminder(reminder._id)}>
                  Delete
                </section>
              </div>
            ))
          }
        </center>

      </div>
    </div >
  )
}

export default App