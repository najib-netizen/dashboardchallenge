
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return <Footer />; // Show footer while redirecting
};

export default Index;
