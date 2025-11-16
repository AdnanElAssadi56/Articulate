const FeaturesSection = () => {
  const features = [
    {
      icon: '🎤',
      title: 'Natural Voice Conversations',
      description: 'Engage in fluid, natural conversations with AI advisors using advanced voice technology',
      color: '#0ea5e9',
      lightColor: '#e0f2fe'
    },
    {
      icon: '🎯',
      title: 'Specialized Expertise',
      description: 'Access advisors trained in specific domains from career guidance to spiritual counseling',
      color: '#2563eb',
      lightColor: '#dbeafe'
    },
    {
      icon: '⚡',
      title: 'Instant Availability',
      description: 'Get guidance whenever you need it, 24/7 without scheduling or waiting',
      color: '#16a34a',
      lightColor: '#dcfce7'
    },
    {
      icon: '🔒',
      title: 'Private & Secure',
      description: 'Your conversations are confidential and protected with enterprise-grade security',
      color: '#9333ea',
      lightColor: '#f3e8ff'
    }
  ];

  return (
    <section className="py-16 max-sm:py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Why Choose Articulate?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience the future of personalized guidance with AI-powered advisors
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-card/80 backdrop-blur-sm border-2 border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 -z-10" style={{ backgroundColor: feature.color }}></div>
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-sm"
              style={{ backgroundColor: feature.lightColor }}
            >
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
