const container = require('typedi').Container;

const userRepository = require('./userRepository.js');
const userService = require('./userService.js');
const kakaoService = require('./kakaoService.js');
container.set('userRepository', new userRepository);
container.set('userService', new userService(container));
container.set('kakaoService', new kakaoService(container));

module.exports = container;

