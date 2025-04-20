const Login = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    }
    return (
        <div className="flex flex-col items-center mt-20">
            <h1 className="text-2xl font-semibold mb-4">Login</h1>
            <button
                onClick={handleLogin}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Login with Google
            </button>
        </div>
    )
}

export default Login