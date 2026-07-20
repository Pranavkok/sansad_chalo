export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl min-h-[calc(100vh-8rem)]">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">About the Movement</h1>
      
      <div className="prose prose-invert prose-lg max-w-none">
        <p className="text-xl text-muted-foreground mb-8">
          We believe in standing together to create meaningful change. This platform is designed to give every supporter a voice and a face in the movement.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Our Goals</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Raise awareness through collective digital presence.</li>
          <li>Unify voices globally under a single, trackable movement.</li>
          <li>Provide an easy, frictionless way to show support publicly.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-2">How is my supporter number generated?</h3>
            <p className="text-muted-foreground">Your supporter number is assigned sequentially based on when you join. It is uniquely yours and will never be duplicated.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-2">What data do you collect?</h3>
            <p className="text-muted-foreground">We only collect the basic information provided by your Google sign-in (Name, Email, Profile Picture) to generate your personalized card.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-2">Can I share my card?</h3>
            <p className="text-muted-foreground">Yes! In your dashboard, you will find options to download your card or share it directly to social media platforms.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
