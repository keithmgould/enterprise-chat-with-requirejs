define( function () {
  console.log("loading chatWindowModule");
  return function (sb) {
    var thread = sb.dom().find("ul");

    return {
      init : function () {
        sb.on({
          "new-message" : this.addMessage,
          "receive-message" : this.addMessage
        });
      },
      destroy : function () {},
      addMessage : function (text) {
        thread.append("<li>" + text + "</li>");
        sb.dom().prop({scrollTop: sb.dom().prop("scrollHeight")});
      }
    };
  }
});
