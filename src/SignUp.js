import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const { validation } = useParams();

  localStorage.setItem('Authorization', validation);

  useEffect(() => {
    navigate(`/timeline`, { replace: true });
  });
}
