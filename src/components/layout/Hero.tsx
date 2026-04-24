import { motion } from "framer-motion";

const name = "ghc".split("");

function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center text-center">
      <div className="-translate-x-8 -translate-y-16">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 text-sm uppercase tracking-[0.25em] text-[var(--text-sub)]"
        >
          Developer 路 Builder 路 Explorer
        </motion.p>

        <div>
          {name.map((char, index) => (
            <motion.span
              key={char}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.4 + index * 0.12,
                duration: 0.6,
                type: "spring",
                stiffness: 150,
              }}
              className="text-7xl font-bold"
            >
              {char}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="my-4 mb-8 text-2xl text-[var(--text-sub)]"
        >
          MyBlog
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mb-10 flex flex-wrap justify-center gap-3"
        >
          {[
            "Frontend Developer",
            "Lifelong Learner",
            "Open Source Enthusiast",
          ].map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.5 + index * 0.15,
                duration: 0.4,
              }}
              className="rounded-full border border-[var(--theme-accent-border)] bg-[var(--theme-accent-soft)] px-4 py-1.5 text-sm text-[var(--theme-accent)]"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-6 -translate-x-8 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-[var(--text-faint)]">
          Scroll
        </span>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="flex h-8 w-5 justify-center rounded-full border-2 border-[var(--border-normal)] pt-1.5"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="h-1 w-1 rounded-full bg-[var(--text-faint)]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
