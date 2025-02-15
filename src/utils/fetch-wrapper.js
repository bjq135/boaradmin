
const fetchWrapper = async (url, config = {}) => {
  // 请求拦截器
  const requestInterceptors = [
    (config) => {
      let token = localStorage.getItem('token');
      if(token){
        config.headers.append('Authorization', 'Bearer ' + token);
        return config;
      }
    },
  ];

  // 依次执行请求拦截器
  for (const interceptor of requestInterceptors) {
    config = interceptor(config);
  }

  try {
    const response = await fetch(url, config);

    // 响应拦截器
    const responseInterceptors = [
      // (response) => {
      //   // 可以在这里处理响应数据，比如统一处理错误
      //   if (!response.ok) {
      //     throw new Error(`HTTP error! status: ${response.status}`);
      //   }
      //   return response;
      // },
    ];

    // 依次执行响应拦截器
    for (const interceptor of responseInterceptors) {
      response = interceptor(response);
    }

    // const data = await response.json();return data;
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default fetchWrapper;

