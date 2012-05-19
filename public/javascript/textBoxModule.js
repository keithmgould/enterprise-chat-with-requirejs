define( function () {
  console.log("loading textBoxModule");
  return function(sb) {
    var messageTextBox = sb.dom().find("#message"),
        nameTextBox = sb.dom().find("#clientName"),
        button = sb.dom().find("#submitMessage");

    return {
      init : function () {
        that = this;
        messageTextBox.keydown(function (e) {
          if (e.which === 13){
           that.handleInput();
          }
        });
      },
      destroy : function () {},
      handleInput : function () {
        sb.emit({
          type : "new-message",
          data : nameTextBox.val() + ":  " + messageTextBox.val()
        });
        messageTextBox.val("");
      }
    };
  }
});
