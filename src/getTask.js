const AWS = require("aws-sdk");

const getTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameter;

  const result = await dynamodb
    .get({
      TableName: "TaskTable",
      Key: {
        id,
      },
    })
    .promise();
};

const task = result.Items;

return {
  status: 200,
  body: JSON.stringify(task),
};

module.exports = {
  getTask,
};
