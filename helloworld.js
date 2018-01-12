// Example 1: sets up service wrapper, sends initial message, and
// receives response.

var prompt = require('prompt-sync')();
var ConversationV1 = require('watson-developer-cloud/conversation/v1');

// Set up Conversation service wrapper.
var conversation = new ConversationV1({
  username: '4c4a1ad3-982c-412a-92bf-43a89cf27796', // replace with username from service key
  password: 'bxcEu5WMR32j', // replace with password from service key
  path: { workspace_id: 'e5a688b0-0361-41d2-8353-b398281673cf' }, // replace with workspace ID
  version_date: '2017-05-26'
});

// Start conversation with empty message.
conversation.message({}, processResponse);

// Process the conversation response.
function processResponse(err, response) {
  if (err) {
    console.error(err); // something went wrong
    return;
  }

  // If an intent was detected, log it out to the console.
  if (response.intents.length > 0) {
    console.log('Detected intent: #' + response.intents[0].intent);
  }

  // Display the output from dialog, if any.
  if (response.output.text.length != 0) {
      console.log(response.output.text[0]);
  }

  // Prompt for the next round of input.
  var newMessageFromUser = prompt('>> ');
  conversation.message({
    input: { text: newMessageFromUser }
    }, processResponse)
}

