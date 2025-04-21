import { signInWithGoogle } from "../_lib/actions";

const SignInButton = () => {
  return (
    <form action={signInWithGoogle}>
      <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
        Sign In With Google
      </button>
    </form>
  );
};
export default SignInButton;
