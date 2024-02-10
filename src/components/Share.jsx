import { toast } from 'react-toastify';

/* eslint-disable react/prop-types */
export function ShareButton({ title, url }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (error) {
        toast.console.error();('Error sharing',error.message);
      }
    } else {
      toast.error(`Your browser doesn't support web share functionality.`);
    }
  };

  return <button onClick={handleShare}>Share</button>;
}

