// const URL_API = "https://minibackend-findy-3039.onrender.com/"; 

const URL_API = "https://ensayo-minibackend.onrender.com/"; 

const endpoints = {
  feed: `${URL_API}feed`,
  stories: `${URL_API}stories`,
  posts: `${URL_API}posts`,
  profile: `${URL_API}profile`,
  imageDetail: `${URL_API}imageDetail`,
  users: `${URL_API}users`,
  userByEmailAndPass: (email, password) =>
    `${URL_API}user?email=${email}&password=${password}`,
};

export default endpoints;