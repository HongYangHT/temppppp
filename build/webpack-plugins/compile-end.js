/*
 * @Author: sam.hongyang
 * @LastEditors  : sam.hongyang
 * @Description: function description
 * @Date: 2020-01-08 12:22:47
 * @LastEditTime : 2020-01-08 14:19:50
 */
class EndWebpackPlugin {

  constructor(done, error) {
      this.done = done;
      this.error = error;
  }

  apply(compiler) {
      compiler.hooks.done.tap('EndWebpackPlugin', (stats) => {
          this.done(stats);
      });
      compiler.hooks.failed.tap('EndWebpackPlugin', (err) => {
          this.error(err);
      });
  }
}

module.exports = EndWebpackPlugin;
