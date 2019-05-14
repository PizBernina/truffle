const { assert } = require("chai");
const CommandRunner = require("../commandrunner");
const Server = require("../server");
const tmp = require("tmp");
const fse = require("fs-extra");
const path = require("path");

describe("truffle migrate", () => {
  let config, sourcePath;

  before(done => Server.start(done));
  after(done => Server.stop(done));

  beforeEach("set up config for logger", () => {
    tempDir = tmp.dirSync({ unsafeCleanup: true });
    sourcePath = path.join(__dirname, "../../sources/migrations/init");
    fse.copySync(sourcePath, tempDir.name);
    config = { working_directory: tempDir.name };
    config.logger = { log: () => {} };
  });

  afterEach("clear working_directory", () => {
    tempDir.removeCallback();
  });

  describe("when run on the most basic truffle project", () => {
    it("doesn't throw", done => {
      CommandRunner.run("migrate", config, error => {
        assert(error === undefined, "error should be undefined here");
        done();
      });
    }).timeout(20000);
  });
});