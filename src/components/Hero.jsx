import "../styles/theme.css";

function Hero() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="crt">
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4 neon-text">
            Welcome to AI Chat
          </h1>
          <p className="text-xl text-matrix-green mb-8">
            Experience the future of conversation
          </p>
          {/* ... existing content ... */}
        </div>
      </div>
    </div>
  );
}

export default Hero;
