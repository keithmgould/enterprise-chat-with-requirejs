define(["jquery"],function ($) {
  console.log("loading sandbox");
  return function (core, moduleID) {
    return {
      dom : function () {
        return $('#' + moduleID);
      },
      emit : function (msg) {
        core.emit(msg);
      },
      on : function (msgs) {
        core.on(msgs, moduleID);
      }
    }
   }
});
