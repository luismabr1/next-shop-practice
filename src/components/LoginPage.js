import { useRef, useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useAuth } from '@hooks/useAuth'
import { useRouter } from 'next/router'

export default function LoginPage(props) {
  const [errorLogin, setErrorLogin] = useState(null)
  const [loading, setLoading] = useState(false)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const auth = useAuth()
  const router = useRouter()

  /*   const handleSubmit = (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    console.log(email, password)
    auth.signIn(email, password).then(() => {
      console.log('sign in success')
    })
  } */
  const submitHandler = event => {
    event.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    setErrorLogin(null)
    setLoading(true)
    auth
      .signIn(email, password)
      .then(() => {
       /*  console.log('sign in success') */
        router.push('/dashboard')
      })
      .catch(function (error) {
        if (error.response?.status === 401) {
          setErrorLogin('Usuario o password incorrecto.')
        } else if (error.request) {
          setErrorLogin('Tenemos un problema')
        } /*  else {
          setErrorLogin('Algo salió mal.')
        }  */
        setLoading(false)
      })
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              alt="Workflow"
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          {/* handle submit envia y captura la referencia de los inputs para luego enviarlos a la consola */}
          <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            <input defaultValue="true" name="remember" type="hidden" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="sr-only" htmlFor="email-address">
                  Email address
                </label>
                <input
                  ref={emailRef}
                  required
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="email-address"
                  name="email"
                  placeholder="Email address"
                  type="email"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="password">
                  Password
                </label>
                <input
                  ref={passwordRef}
                  required
                  autoComplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label className="ml-2 block text-sm text-gray-900" htmlFor="remember-me">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a className="font-medium text-indigo-600 hover:text-indigo-500" href="/forgot">
                  Forgot your password?
                </a>
              </div>
            </div>
            {errorLogin && (
              <div
                className="p-3 mb-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                <span className="font-medium">Error!</span> {errorLogin}
              </div>
            )}

            {loading && (
              <span className="flex absolute h-4 w-4 top-0 right-0 -mt-1 -mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-400"></span>
              </span>
            )}

            <div>
              <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
