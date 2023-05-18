
class userService {
  constructor(container) {
    console.log('user service has been made.');
    this.userRepositoryInstance = container.get('userRepository');
  }
  serviceMethod() {
    this.userRepositoryInstance.repositoryMethod();
  }
}

module.exports = userService;

