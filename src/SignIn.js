import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const { validation } = useParams();

  localStorage.setItem('Authorization', validation);

  useEffect(() => {
    navigate(`${process.env.PUBLIC_URL}/timeline`, { replace: true });
  });
}
