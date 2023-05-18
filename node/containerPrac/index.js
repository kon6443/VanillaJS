const container = require('./container.js');

console.log('index!');
const userServiceInstance = container.get('userService');
userServiceInstance.serviceMethod();

const kakaoServiceInstance = container.get('kakaoService');
