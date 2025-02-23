import { aboutbanner } from "../../public/assets";

const About = () => {
  return (
    <div className="mt-20">
      <div className="flex justify-center mx-auto">
        <img
          src={aboutbanner}
          alt=""
          className="w-60 h-auto object-contain rounded-md"
        />
      </div>
      <div className="divider"></div>

      <h1 className="text-3xl font-bold text-center mt-4">About Us.</h1>

      <h4 className="text-center text-6xl text-primary">
        {" "}
        Virtual Art Gallery{" "}
      </h4>
      <p className="text-center max-w-xl mx-auto my-2">
        Welcome to our online art gallery! Dive into a world of creativity with
        captivating masterpieces from global artists. Whether you're an art
        enthusiast or a first-time visitor, our virtual sanctuary invites you to
        explore a diverse canvas of inspiration. Login now to embark on a
        personalized art experience that celebrates the beauty of human
        expression.
      </p>
    </div>
  );
};

export default About;
