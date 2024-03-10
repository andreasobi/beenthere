import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">

      <h1 className="head_text text-center">
        Share Your Trips
        <br className="max-md:hidden" />
      </h1>

      <p className="desc text-center">
        Edit, Share, Rate
      </p>

      <Feed/>
      
    </section>
  );
};

export default Home;
