function isImageOrVideoUrl(url) {
    const fileExtension = url.split('.').pop().toLowerCase();
  
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const videoExtensions = ['mp4', 'webm', 'ogg', 'avi', 'mov'];
  
    if (imageExtensions.includes(fileExtension)) {
      return 'image';
    } else if (videoExtensions.includes(fileExtension)) {
      return 'video';
    } else {
      return 'unknown';
    }
  }
  
  export function checkMediaTypes(urls) {
    for (const item of urls) {
      
      const mediaType = isImageOrVideoUrl(item?.filepath);
      item.mediaType = mediaType;

    }
  }
  
  const mediaItems = [
    { url: 'https://example.com/image.jpg' },
    { url: 'https://example.com/video.mp4' },
    { url: 'https://example.com/document.pdf' },
    // ... add more items as needed
  ];
  

  