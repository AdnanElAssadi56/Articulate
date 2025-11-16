export const CATEGORIES = [
  {
    id: 'career',
    name: 'Career & Professional',
    icon: '💼',
    color: '#2563eb', // Blue 600 - Trust, stability, corporate world
    lightColor: '#dbeafe', // Blue 100
    description: 'Career guidance, interview prep, and professional development'
  },
  {
    id: 'wellness',
    name: 'Wellness & Mental Health',
    icon: '🧠',
    color: '#16a34a', // Green 600 - Health, growth, balance
    lightColor: '#dcfce7', // Green 100
    description: 'Mental health support, fitness coaching, and lifestyle guidance'
  },
  {
    id: 'spiritual',
    name: 'Spiritual & Faith',
    icon: '🕌',
    color: '#9333ea', // Purple 600 - Spirituality, wisdom, transcendence
    lightColor: '#f3e8ff', // Purple 100
    description: 'Spiritual guidance, Quran recitation, and faith-based counseling'
  },
  {
    id: 'academic',
    name: 'Academic & Learning',
    icon: '🎓',
    color: '#ea580c', // Orange 600 - Energy, enthusiasm, learning
    lightColor: '#ffedd5', // Orange 100
    description: 'Tutoring, study skills, and educational support'
  },
] as const;

export type CategoryId = typeof CATEGORIES[number]['id'];

export const getCategoryById = (id: string) => {
  return CATEGORIES.find(cat => cat.id === id);
};

export const getCategoryColor = (id: string) => {
  return getCategoryById(id)?.color || '#6b7280';
};

export const getCategoryLightColor = (id: string) => {
  return getCategoryById(id)?.lightColor || '#f0f9ff';
};

export const getCategoryIcon = (id: string) => {
  return getCategoryById(id)?.icon || '📚';
};
