// Popular video file extensions
export const videoExtensions = [
  'mp4', 'webm', 'ogg', 'mkv', 'flv', 'avi', 'mov', 'wmv', 'mpeg', 'mpg', '3gp', 'm4v', 'm3u8'
];

// Function to check if URL is in correct format (FTP, HTTP, HTTPS)
export const validateLink = (url) => /^(ftp|http|https):\/\/[^ "]+$/.test(url);

// Function to check if URL is a video file
export const isVideoFile = (url) => {
  try {
    const parsedUrl = new URL(url);

    // Kiểm tra đuôi file trong pathname và cả query string
    const extensionInPath = parsedUrl.pathname.split('.').pop();
    const extensionInQuery = parsedUrl.searchParams.get('url')?.split('.').pop();
    
    return videoExtensions.includes(extensionInPath.toLowerCase()) || 
           (extensionInQuery && videoExtensions.includes(extensionInQuery.toLowerCase()));
  } catch (error) {
    return false;
  }
};

// Function to check if URL is a valid video link
export const validateVideoLink = (url) => {
  return validateLink(url) && (isVideoFile(url));
};

export const checkVideoLink = async (url) => {
  console.log("🚀 ~ checkVideoLink ~ url:", url)
  try {
    const response = await fetch(url, {
      method: 'HEAD', // Get only header instead of entire video content
    });
    
    // Check the MIME type in the response to see if it is video.
    const contentType = response.headers.get('Content-Type');
    console.log("🚀 ~ checkVideoLink ~ contentType:", contentType)
    
    // Common MIME types for video are `video/` or `.m3u8` streams
    return contentType && (contentType.includes('application/vnd.apple.mpegurl') || contentType.startsWith('video/'));
  } catch (error) {
    console.error('Error fetching video URL', error);
    return false;
  }
};


export const validateEpisodeFormInputs = (data, setErrorMessage) => {
  const fields = [
    { field: 'filename', message: 'Title không được bỏ trống' },
    { field: 'name', message: 'Name không được bỏ trống' },
    { field: 'slug', message: 'Slug không được bỏ trống' },
    { field: 'link_embed', message: 'Link video không hợp lệ', validate: validateVideoLink },
    { field: 'link_m3u8', message: 'Link video không hợp lệ', validate: validateVideoLink }
  ];

  for (const { field, message, validate } of fields) {
    if (!data[field] || (validate && !validate(data[field]))) {
      setErrorMessage(message);
      return false;
    }
  }
  return true;
};

export const validateEpisodeFormUpdates = (data, setErrorMessage) => {
  const fields = [
    { field: 'title', message: 'Title không được bỏ trống' },
    { field: 'name', message: 'Name không được bỏ trống' },
    { field: 'slug', message: 'Slug không được bỏ trống' },
    { field: 'link_embed', message: 'Link video không hợp lệ', validate: validateVideoLink },
    { field: 'link_m3u8', message: 'Link video không hợp lệ', validate: validateVideoLink }
  ];

  for (const { field, message, validate } of fields) {
    if (!data[field] || (validate && !validate(data[field]))) {
      setErrorMessage(message);
      return false;
    }
  }
  return true;
};

export const compareObjects = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
};

// Password validation functions
export const isMinLengthPassword = (password) => {
  return password.length >= 8;
};

export const isHasLowerCasePassword = (password) => {
  return /[a-z]/.test(password);
};

export const isHasUpperCasePassword = (password) => {
  return /[A-Z]/.test(password);
};

export const isHasSymbolPassword = (password) => {
  return /[.@$!%*?&]/.test(password);
};

export const validUsername = (username, setErrorMessage) => {
  const minLength = 4;
  const maxLength = 20;
  const usernamePattern = /^[a-zA-Z0-9._-]+$/; // Only letters, numbers and some special characters are allowed

  if (username.length < minLength || username.length > maxLength) {
    setErrorMessage('Tên đăng nhập phải từ 4 đến 20 ký tự.');
    return false;
  }
  
  if (!usernamePattern.test(username)) {
    setErrorMessage('Tên đăng nhập chỉ cho phép ký tự chữ cái, số và các ký tự ., _ và -.');
    return false;
  }

  setErrorMessage('');
  return true;
};

export const validatePassword = (password, updateValidation, setErrorMessage) => {
  let isValid = true;

  const conditions = [
    { message: 'Mật khẩu phải tối thiểu 8 ký tự', validate: isMinLengthPassword, key: 'minLength' },
    { message: 'Mật khẩu phải ít nhất 1 chữ viết thường', validate: isHasLowerCasePassword, key: 'lowercase' },
    { message: 'Mật khẩu phải ít nhất 1 chữ viết hoa', validate: isHasUpperCasePassword, key: 'uppercase' },
    { message: 'Mật khẩu phải ít nhất 1 ký tự đặc biệt', validate: isHasSymbolPassword, key: 'symbol' },
  ];

  conditions.forEach(({ message, validate, key }) => {
    if (!password) {
      setErrorMessage('Mật khẩu không được bỏ trống');
      isValid = false;
    }
    if (validate && !validate(password)) {
      setErrorMessage(message);
      if (key) updateValidation(key, false); // Update từng điều kiện
      isValid = false;
    } else if (key) {
      updateValidation(key, true); // update if valid
    }
  });

  if (isValid) {
    setErrorMessage('');
  }

  return isValid;
};

export const validateConfirmPassword = (password, confirmPassword, setErrorMessage) => {
  if(!password||!confirmPassword){
    setErrorMessage("Mật khẩu không được bỏ trống");
    return false;
  }
  if(password!==confirmPassword){
    setErrorMessage("Mật khẩu không khớp");
    return false;
  }
  setErrorMessage('');
  return true;
};

export const validateRegisterForm = (data, setErrorMessage) => {
  const fields = [
    { field: 'name', message: 'Họ và tên không được bỏ trống' },
    { field: 'userName', message: 'Tên đăng nhập không được bỏ trống' },
    { field: 'password', message: 'Mật khẩu không được bỏ trống'},
    { field: 'confirmPassword', message: 'Mật khẩu không được bỏ trống'},
  ];

  for (const { field, message } of fields) {
    if (!data[field]) {
      setErrorMessage(message);
      return false;
    }
  }
  setErrorMessage(''); // Clear any previous error messages
  return true;
};