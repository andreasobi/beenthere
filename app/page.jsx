import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">

      <h1 className="head_text text-center">
        Discover and Share
        <br className="max-md:hidden" />
        <span className="orange_gradient"> Share Experiences</span>
      </h1>

      <p className="desc text-center">
        Share your trips easy with your friends
      </p>

      <Feed />
      
    </section>
  );
};

export default Home;