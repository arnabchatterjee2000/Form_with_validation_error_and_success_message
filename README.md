# Form_with_validation_error_and_success_message

A project, where the parent window of the webpage is communicating with the iframe inside of which a form is present and this form is being used to perform some validation based on the data passed by the parent window and then send the results back to the parent window.

So a two way communication is being established between parent window to iframe and then back from iframe to parent window.

So initially when the project is loading the validators are being sent to the iframe instance and then when someone fills up the form and clicks the submit button, the iframe instance performs some validations based on the validators data being sent from the parent window and constructs a result which is then sent back to the parent window and the results are displayed.
