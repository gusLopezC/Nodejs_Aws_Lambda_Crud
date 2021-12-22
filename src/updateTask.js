const AWS = require("aws-sdk");

const updateTask = async(event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    const { done, title } = JSON.parse(event.body);

    await dynamodb.update({
        TableName: "TaskTable",
        Key: { id },
        UpdateExpression: 'set done = :done, title  = :title',
        ExpressionAttributeValues: {
            ':done': done,
            ':title': title
        },
        ReturnValues: 'ALL_NEW'
    }).promise();

    return {
        status: 200,
        body: JSON.stringify({ message: "Tarea actualizada correctamente." })
    }

};
module.exports = {
    updateTask,
};