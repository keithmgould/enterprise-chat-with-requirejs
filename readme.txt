This is another version of the chat server (https://github.com/keithmgould/enterprise-chat).  
However this version uses Require.JS.  I'm happy with it with one exception,
the moduleLoader (which loades widgets), is really ugly.  There must be a
better way.

Here are the notes from the first version of the Chat Server:

Implemented the enterprise JS architecture as explained by Nicholas Zakas, and further demonstrated by Andrew Burgess, with example functionality of a chat system.

The implementation is straightforward and I followed the architecture with one exception: I could not bring myself to except the notion of wrapping the base layer (in this case JQuery) in an abstraction.  This would ultimately yield wrapping the entirety of JQuery which seems silly for all but the largest projects.  I still used the sandbox to scope all selectors, but did allow a module to wield JQuery objects.

Zakas points out that the core should be extensible, so I broke it into extensions. There are currently two: 'transport' and 'modules', which handle said responsibilities respectively.   The transport core abstracts socket.IO, as Socket.IO in this architecture would be considered part of the Base (along with JQuery).  A module never talks directly to the server.  A module emits, and the transport core extension determines if the event should be passed on to the server.

There is very little cross-talk between the core extensions, though I did do this in one place, and don't know how to avoid it: when the module core is finished emitting to local modules, it passes the msg/event off to the transport core in case the message should be sent to the server.
