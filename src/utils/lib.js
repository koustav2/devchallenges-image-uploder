/* eslint-disable react/prop-types */

export const handleShare = async (title, url) => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: title,
                url: url,
            });
            console.log('Content shared successfully');
            return true;
        } catch (error) {
            console.log('Error sharing', error);
            return false;
        }
    } else {
        console.log(`Your system doesn't support web share functionality.`);
        return false;
    }
};



