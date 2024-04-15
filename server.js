const express = require('express');
const Joi = require('joi');
const app = express();

// Define Joi schema for expression validation
const schema = Joi.object({
    expression: Joi.string().required()
});

// Route handler for evaluating expressions
app.get('/evaluate/:expression', (req, res) => {
    // Validate the expression parameter against the schema
    const { error, value } = schema.validate(req.params);
    
    if (error) {
        // If validation fails, send a 400 Bad Request response with the validation error message
        return res.status(400).send(error.details[0].message);
    }

    // Extract the expression from the validated parameters
    const expression = value.expression;

    try {
        // Parse and evaluate the expression
        const result = eval(expression); // Note: Using eval() can be unsafe in production, consider using a safer alternative
        // Send the result back to the client
        res.send(`Result: ${result}`);
    } catch (error) {
        // If an error occurs during evaluation, send an error response
        res.status(400).send('Error: Invalid expression');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
