const Lottery = artifacts.require("Lotteria");

module.exports = function (deployer) {
  deployer.deploy(Lottery);
};
