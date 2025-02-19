import { useActionState } from 'react'
import { fakeLogin } from '../api'
import { useFormStatus } from 'react-dom';

export const SubmitButton = () => {
  const status = useFormStatus();
  console.log(status)
  return (
    <button className="btn" type="submit" disabled={status.pending}>
      {status.pending ? 'Loading...' : 'Submit'}
    </button>
  );
}

export default function AuthForm() {
  const [formState, submitAction] = useActionState(auth, { data: null, error: null });

  async function auth(prevState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    try {
      const response = await fakeLogin({ email, password })
      return { data: response, error: null }
    } catch (e) {
      return { data: null, error: e.message }
    }
  }

  return (
    <form action={submitAction}>
      <div className="input-field">
        <input
          name="email"
          id="email"
          type="email"
          className="validate"
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="input-field">
        <input
          name="password"
          id="password"
          type="password"
          className="validate"
        />
        <label htmlFor="password">Password</label>
      </div>
      <SubmitButton />
      {formState.data && <p>{formState.data.email} was loged in!</p>}
      {formState.error && <p style={{ color: 'red' }}>{formState.error}</p>}
    </form>
  )
}
