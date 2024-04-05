import { useNavigate } from "react-router-dom";

export default function ConnectCTA() {
  const navigate = useNavigate();

  return (
    <div className="w-full py-12 md:py-24 lg:py-32 rounded-lg shadow-md ">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Join the community
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Connect with art lovers around the world
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Embrace the power of art to bring people together. Share your
              passion, discover new artists, and engage in meaningful
              conversations.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="mx-auto max-w-[400px] space-y-4 sm:px-6">
              <h3 className="font-bold">Are you an artist?</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Join our community of creators and showcase your artwork to a
                global audience.
              </p>
              <button
                onClick={() => navigate("/artist-onboard")}
                className="w-full btn btn-primary btn-outline"
              >
                Sign up as an artist
              </button>
            </div>
            <div className="mx-auto max-w-[400px] space-y-4 sm:px-6">
              <h3 className="font-bold">Are you an art lover?</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Explore stunning artwork, support your favorite artists, and
                connect with other art enthusiasts.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary btn-outline w-full"
              >
                Join as an art lover
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
