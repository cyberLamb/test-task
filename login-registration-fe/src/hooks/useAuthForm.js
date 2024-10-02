import { useForm } from 'react-hook-form';

const useAuthForm = (mode) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/${mode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return { register, handleSubmit, errors, onSubmit };
};

export default useAuthForm;
