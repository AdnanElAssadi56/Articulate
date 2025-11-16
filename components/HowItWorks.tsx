const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Advisor',
      description: 'Browse our library of 16+ specialized AI advisors across 4 categories',
      icon: '🔍',
      color: '#2563eb'
    },
    {
      number: '02',
      title: 'Start Conversation',
      description: 'Click to begin a natural voice conversation with your selected advisor',
      icon: '🎤',
      color: '#16a34a'
    },
    {
      number: '03',
      title: 'Get Guidance',
      description: 'Receive personalized advice and insights tailored to your needs',
      icon: '💡',
      color: '#9333ea'
    },
    {
      number: '04',
      title: 'Track Progress',
      description: 'Review your conversation history and bookmark favorite advisors',
      icon: '📊',
      color: '#ea580c'
    }
  ];

  return (
    <section className="py-16 max-sm:py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get started in minutes with our simple 4-step process
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {/* Connection line - desktop only */}
        <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent"></div>
        
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="bg-card/80 backdrop-blur-sm border-2 border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group relative z-10">
              {/* Number badge */}
              <div 
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg"
                style={{ backgroundColor: step.color }}
              >
                {step.number}
              </div>
              
              {/* Icon */}
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${step.color}15` }}
              >
                {step.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
