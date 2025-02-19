import { useOptimistic, useRef, useState } from 'react'

async function sendMessage(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject(new Error("Failed to send message")); 
      } else {
        resolve(message);
      }
    }, 1000);
  });
}

export function OptimisticMessage() {
  const formRef = useRef()
  const [messages, setMessages] = useState([])


  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (prevState, newMessage) => {
      return [...prevState, { text: newMessage, pending: true }];
    }
  )

  async function formAction(formData) {
    addOptimisticMessage(formData.get('message'));
    formRef.current.reset()
    try {
      const message = await sendMessage(formData.get('message'))
      setMessages((messages) => [...messages, { text: message, pending: false }])
    } catch (error) {
      console.log('Failed to add new message! - ', error.message)
    }
  }

  return (
    <form ref={formRef} action={formAction}>
      <div className="input-field">
        <input name="message" />
      </div>
      <button type="submit" className="btn">
        Send
      </button>
      <ul className="collection">
        {optimisticMessages.map((message, i) => (
          <li className="collection-item" key={i}>
            {message.text} {message.pending && <small>(Adding)</small>}
          </li>
        ))}
      </ul>
    </form>
  )
}


