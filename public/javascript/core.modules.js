define(["sandbox", "moduleLoader", "core.transport"], function (Sandbox, moduleLoader, coreTransport) {
  console.log("loading core.modules");
  var moduleData = {};

  return {
    init : function () {
      coreTransport.listen(this.emit);
      this.create_all_modules();
      this.start_all();
    },
    create_all_modules : function () {
      var mod;
      for(mod in moduleLoader){
        console.log("mod: " + mod);
        this.create_module(mod, moduleLoader[mod]);
      }
    },
    create_module : function (moduleID, creator) {
      moduleData[moduleID] = {
        create : creator,
        instance : null
      };
    },
    start : function(moduleID) {
      var mod = moduleData[moduleID];
      if (mod) {
        var sb = new Sandbox(this, moduleID);
        mod.instance = mod.create(sb);
        mod.instance.init();
      }
    },
    start_all : function () {
      console.log("starting all modules");
      var moduleID;
      for(moduleID in moduleData){
        this.start(moduleID);
      }
    },
    on : function (msgs, mod) {
      if (moduleData[mod]) {
          moduleData[mod].events = msgs;
      } else {
          this.log(1, "");
      }
    },
    emit : function (msg) {
        var mod;
        for (mod in moduleData) {
            if (moduleData.hasOwnProperty(mod)){
                mod = moduleData[mod];
                if (mod.events && mod.events[msg.type]) {
                    mod.events[msg.type](msg.data);
                }
            }
        }
        coreTransport.emit(msg);
    }
  }
});
