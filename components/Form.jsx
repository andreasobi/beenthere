import Link from "next/link";
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="orange_gradient">{type} Trip</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing trips with your friends
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Trip
          </span>

          <textarea 
            value={post.trip}
            onChange={(e) => setPost({
              ...post, trip: e.target.value
            })}
            placeholder="Tell us about your trip" required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {' '}
            <span className="font-normal">(Vietnam, Hanoi)</span>
          </span>

          <input 
            value={post.tag}
            onChange={(e) => setPost({
              ...post, tag: e.target.value
            })}
            placeholder="tag" required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">

          <Button
              type="submit"
              disable={submitting}
            >
              {submitting ? `${type}...`: type}
            </Button>

            <Button asChild variant="secondary">
              <Link href="/">
                Cancel
              </Link>
            </Button>
        </div>
      </form>
    </section>
  )
};
export default Form;